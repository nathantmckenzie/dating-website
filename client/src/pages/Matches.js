import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, auth, firebaseAuth, firestore } from "../base";
import noProfilePicture from "../pictures/no-profile-picture.png";
import { FirestoreCollection } from "react-firestore";

export default function Matches({
  possibleMatches,
  details,
  showChat,
  setShowChat,
  lastMessage,
  showProfile,
  setShowProfileUID,
  showProfileUID,
  setShowMatchID,
  showMatchID,
}) {
  const [showMatches, setShowMatches] = useState(true);
  const [myMatches, setMyMatches] = useState();
  const { uid } = auth.currentUser;
  const currentUID = firebaseAuth.currentUser.uid;
  const arr2 = ["lfp6SpKujxFAMK3E8cYE", "Vbvqom5hHmS3lkRqWnNw"];

  useEffect(() => {
    setMyMatches(
      details.filter((detail) => detail.uid === currentUID)[0].matches
    );
  }, [details]);

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
          {/*{details.map((detail) => {
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
          })}*/}
          <FirestoreCollection
            path="users"
            render={({ isLoading, data }) => {
              return isLoading ? (
                <div>null</div>
              ) : (
                data
                  .filter((user) => user.uid !== currentUID)
                  .map((user) => {
                    {
                      var onClickMatch = () => {
                        setShowChat(true);
                        setShowProfileUID(user.uid);
                        {
                          console.log("MyMatches", myMatches);
                        }
                        setShowMatchID(
                          user.matches
                            .filter(
                              (element) => element === "Vbvqom5hHmS3lkRqWnNw" //arr2.includes(element)
                            )
                            .toString()
                        );
                      };
                    }

                    return (
                      <>
                        <div
                          key={user.uid}
                          className="match-picture-name"
                          onClick={onClickMatch}
                        >
                          <img
                            src={
                              user.avatar ? user.avatar[0] : noProfilePicture
                            }
                            className="match-picture"
                          />
                          <h4 className="match-name">{user.firstName} </h4>
                        </div>
                      </>
                    );
                  })
              );
            }}
          />
        </div>
      ) : (
        <div className="all-messages" pre>
          <FirestoreCollection
            path="users"
            render={({ isLoading, data }) => {
              return isLoading ? (
                <div>null</div>
              ) : (
                data
                  .filter((user) => user.uid !== currentUID)
                  .map((user) => {
                    {
                      var onClickMatch = () => {
                        setShowChat(true);
                        setShowProfileUID(user.uid);
                        {
                          console.log("MyMatches", myMatches);
                        }
                        setShowMatchID(
                          user.matches
                            .filter(
                              (element) => element === "Vbvqom5hHmS3lkRqWnNw" //arr2.includes(element)
                            )
                            .toString()
                        );
                      };
                    }

                    return (
                      <div
                        key={user.uid}
                        className="match-picture-message"
                        onClick={onClickMatch}
                      >
                        <img
                          src={user.avatar ? user.avatar : noProfilePicture}
                          className="message-picture"
                        />
                        <div className="match-text">
                          <h3>{user.firstName} </h3>
                          <h5>{lastMessage}</h5>
                        </div>
                      </div>
                    );
                  })
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
