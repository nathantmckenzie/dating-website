import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, auth, firebaseAuth, firestore } from "../base";

const ChatMessage = ({ message }) => {
  const { text, uid, createdAt } = message;
  const [currentDate, setCurrentDate] = useState(null);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  function toDateTime(secs) {
    var t = new Date(secs * 1000).toISOString().substr(11, 5);
    return t;
  }

  function toFullDateTime(secs) {
    var t = new Date(secs * 1000).toISOString().substr(5, 5);
    return t;
  }

  function convertToPST(t) {
    let hour = parseInt(t.slice(0, 2)) - 7;
    let minutes = t.slice(2);
    if (hour > 11) {
      return (hour - 12).toString() + minutes + " PM";
    } else {
      return hour.toString() + minutes + " AM";
    }
  }

  useEffect(() => {
    console.log("AYY", toFullDateTime(createdAt));
    setCurrentDate(toFullDateTime(createdAt));
  }, [toFullDateTime(createdAt)]);

  return (
    <div className="timesent-messagesent">
      <div className="date-sent">{currentDate}-2021</div>
      <div className={`time-and-message-${messageClass}`}>
        <div className={`time-sent-${messageClass}`}>
          {convertToPST(toDateTime(createdAt))}
        </div>
        <p className={`message-${messageClass}`}>{text}</p>
      </div>
    </div>
  );
};

const Chat = ({ setLastMessage }) => {
  const messagesRef = firestore
    .collection("swipes")
    .doc("31jExSMfFwTwzYb0AFk0")
    .collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    if (formValue.length > 0) {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
      });

      setLastMessage(formValue);

      setFormValue("");
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document
      .getElementsByClassName("chat-main")[0]
      .scrollTo(
        0,
        document.getElementsByClassName("chat-main")[0].scrollHeight
      );
    console.log(document.getElementsByClassName("chat-main")[0].scrollHeight);
  }, [messages]);

  return (
    <div className="chat-column">
      <div className="chat-main">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          className="chat-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />

        <button className="chat-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
