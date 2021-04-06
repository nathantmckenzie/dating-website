import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, auth, firebaseAuth, firestore } from "../base";
import noProfilePicture from "../pictures/no-profile-picture.png";
import Chat from "./Chat";
import Settings from "./SettingsNavBar";

export default function Matches({
  possibleMatches,
  details,
  showChat,
  setShowChat,
  lastMessage,
  showProfile,
  setShowProfileUID,
}) {
  const history = useHistory();
  const [showMatches, setShowMatches] = useState(true);
  const { uid } = auth.currentUser;

  return (
    <div>
      <div className="page-titles">
        <h3
          className={showMatches ? "matches-title-clicked" : null}
          onClick={() => setShowMatches(true)}
        >
          Matches
        </h3>
        <h3
          className={showMatches ? null : "messages-title-clicked"}
          onClick={() => setShowMatches(false)}
        >
          Messages
        </h3>
      </div>
      <br />
      {showMatches ? (
        <div className="all-matches" pre>
          {details.map((detail) => {
            {
              var onClickMatch = () => {
                setShowChat(true);
                setShowProfileUID(detail.uid);
              };
            }
            return (
              <div
                key={detail.uid}
                className="match-picture-name"
                onClick={onClickMatch}
              >
                <img
                  src={detail.avatar ? detail.avatar : noProfilePicture}
                  className="match-picture"
                />
                <h4 className="match-name">{detail.firstName} </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="all-messages" pre>
          {details.map((detail) => {
            return (
              <div
                key={detail.uid}
                className="match-picture-message"
                onClick={() => setShowChat(true)}
              >
                <img
                  onClick={() => {
                    console.log("EE", detail.avatar);
                  }}
                  src={detail.avatar ? detail.avatar : noProfilePicture}
                  className="message-picture"
                />
                <div className="match-text">
                  <h3>{detail.firstName} </h3>
                  <h5>{lastMessage}</h5>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
