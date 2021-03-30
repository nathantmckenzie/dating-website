import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, auth, firebaseAuth, firestore } from "../base";
import { useState, useRef } from "react";

const ChatMessage = ({ message }) => {
  const { text, uid } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message-${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

const Chat = ({ setLastMessage }) => {
  const messagesRef = firestore
    .collection("swipes")
    .doc("ELVJr5eXsvHYl2RJHQ7D")
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

      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
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
