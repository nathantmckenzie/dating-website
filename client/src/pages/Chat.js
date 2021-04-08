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

const Chat = ({
  setLastMessage,
  showMatchID,
  details,
  showProfileUID,
  setShowChat,
  showChat,
  setLastMessageUID,
}) => {
  const messagesRef = firestore
    .collection("matches")
    .doc(showMatchID)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const lastMessageRef = firestore
    .collection("matches")
    .doc(showMatchID)
    .collection("messages")
    .doc("lastMessage");

  firestore
    .collection("matches")
    .doc(showMatchID)
    .collection("messages")
    .doc("lastMessage")
    .get()
    .then((doc) => {
      let data = doc.data();
      setLastMessage(data.text);
      setLastMessageUID(data.uid);
    });

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [currentPicture, setCurrentPicture] = useState();
  const [profile, setProfile] = useState();
  const [matchName, setMatchName] = useState();

  const dummy = useRef();
  let filtered;

  useEffect(() => {
    filtered = details.filter((detail) => detail.uid === showProfileUID)[0];
    setProfile(filtered);
  }, [showProfileUID]);

  useEffect(() => {
    if (profile) {
      setCurrentPicture(profile.avatar[0]);
      setMatchName(profile.firstName);
    }
  }, [profile]);

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

      setFormValue("");
    }
    await lastMessageRef.set({
      text: formValue,
      uid: profile.uid,
    });

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
      <div className="chat-top-bar">
        <img className="chat-top-bar-picture" src={currentPicture} />
        <h3 className="chat-top-bar-message">You matched with {matchName}</h3>
        <button
          className="chat-top-bar-button"
          onClick={() => setShowChat(!showChat)}
        >
          Keep Swiping
        </button>
      </div>
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
