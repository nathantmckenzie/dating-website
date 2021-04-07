import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../base";
import moment from "moment";

const ChatMessage = ({ message }) => {
  const { text, uid, createdAt } = message;
  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [displayNewDate, setDisplayNewDate] = useState(null);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  function toTime(secs) {
    const time = moment.unix(secs).toString().substr(16, 5);
    let hours = parseInt(time.slice(0, 2));
    if (hours > 12) {
      let hours = parseInt(time.slice(0, 2));
      return (hours - 12).toString() + time.slice(2) + " PM";
    } else {
      return time + " AM";
    }
  }

  function toFullDate(secs) {
    const date = moment.unix(secs).toString().substr(4, 6);
    return date;
  }

  useEffect(() => {
    setCurrentDate(toFullDate(createdAt));
  }, []);

  //useEffect(() => {
  //  setDisplayNewDate(toFullDate(createdAt));
  //}, [toFullDate(createdAt)]);

  return (
    <div className="timesent-messagesent">
      <div className="date-sent">{toFullDate(createdAt)}, 2021</div>
      <div className={`time-and-message-${messageClass}`}>
        <div className={`time-sent-${messageClass}`}>{toTime(createdAt)}</div>
        <p className={`message-${messageClass}`}>{text}</p>
      </div>
    </div>
  );
};

const Chat = ({ setLastMessage, showMatchID }) => {
  console.log("showMatchIDDDD", showMatchID);
  const messagesRef = firestore
    .collection("matches")
    .doc(showMatchID)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("MESSAGES REF", messagesRef);
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
