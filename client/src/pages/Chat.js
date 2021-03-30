import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, auth, firebaseAuth, firestore } from "../base";
import { useState, useRef } from "react";

const ChatMessage = ({ message }) => {
  const { text, uid, createdAt } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  function toDateTime(secs) {
    var t = new Date(secs * 1000).toISOString().substr(11, 5);
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

  return (
    <div className="timesent-messagesent">
      <p>{convertToPST(toDateTime(createdAt))}</p>
      <p className={`message-${messageClass}`}>{text}</p>
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
