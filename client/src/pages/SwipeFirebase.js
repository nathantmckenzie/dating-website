import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { app, firebaseAuth } from "../base";
import Matches from "./Matches";
import Profile from "./Profile";
import SettingsNavBar from "./SettingsNavBar";
import Settings from "./Settings";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import StarRateIcon from "@material-ui/icons/StarRate";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import noProfilePicture from "../pictures/no-profile-picture.png";
import Chat from "./Chat";

export default function SwipeFirebase({ details, setDetails }) {
  const [showChat, setShowChat] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [showProfileUID, setShowProfileUID] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [showMatchID, setShowMatchID] = useState();
  const [lastMessageUID, setLastMessageUID] = useState();

  const db = app.firestore();
  const currentEmail = firebaseAuth.currentUser.email;
  const currentUID = firebaseAuth.currentUser.uid;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const swipeLeft = () => {
    db.collection("swipes")
      .doc(makeid(20))
      .set(
        {
          by_user: currentUID,
          to_user: details[0].uid,
          swipe_right: false,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      });

    setDetails(details.filter((detail) => detail !== details[0]));
  };

  const swipeRight = () => {
    let id = makeid(20);

    db.collection("swipes")
      .doc(id)
      .set(
        {
          by_user: currentUID,
          to_user: details[0].uid,
          swipe_right: true,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      });

    let query = db.collection("swipes");
    query = query.where("by_user", "==", details[0].uid);
    query = query.where("swipe_right", "==", true);
    query = query.where("to_user", "==", currentUID);
    query
      .get()
      .then(console.log("IT'S A MATCH"))
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    setDetails(details.filter((detail) => detail !== details[0]));
  };

  const onSwipe = (direction) => {
    console.log("You siped: " + direction);
    if (direction === "right") {
      swipeRight();
    } else if (direction === "left") {
      swipeLeft();
    }
  };

  return (
    <>
      {details ? (
        !showSettings ? (
          <div className={showChat ? "main-page-chat" : "main-page-swiping"}>
            <div class="matches">
              <SettingsNavBar
                details={details}
                setShowSettings={setShowSettings}
              />
              <Matches
                details={details}
                showChat={showChat}
                setShowChat={setShowChat}
                lastMessage={lastMessage}
                setLastMessage={setLastMessage}
                showProfileUID={showProfileUID}
                setShowProfileUID={setShowProfileUID}
                setShowMatchID={setShowMatchID}
                showMatchID={showMatchID}
                lastMessageUID={lastMessageUID}
              />
            </div>
            {!showChat ? (
              <div className="swiping">
                <div className="swipe-profile">
                  <TinderCard preventSwipe={["up", "down"]} onSwipe={onSwipe}>
                    {console.log("details", details)}
                    <div className="overflow-hidden-test">
                      <img
                        src={
                          details[0].avatar
                            ? details[0].avatar
                            : noProfilePicture
                        }
                        className="profile-picture"
                      />
                    </div>
                    <h3>{details[0].firstName}</h3>
                    <h4>{details[0].personality}</h4>
                  </TinderCard>
                  <div className="swipeButtons">
                    <IconButton className="swipeButtons__repeat">
                      <ReplayIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={swipeLeft}
                      className="swipeButtons__left"
                    >
                      <CloseIcon fontSize="large" />
                    </IconButton>
                    <IconButton className="swipeButtons__star">
                      <StarRateIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={swipeRight}
                      className="swipeButtons__right"
                    >
                      <FavoriteIcon fontSize="large" />
                    </IconButton>
                    <IconButton className="swipeButtons__lightning">
                      <FlashOnIcon fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chat-profile">
                <Chat
                  details={details}
                  showProfileUID={showProfileUID}
                  setLastMessage={setLastMessage}
                  showMatchID={showMatchID}
                  setShowChat={setShowChat}
                  showChat={showChat}
                  setLastMessageUID={setLastMessageUID}
                />
                <Profile
                  details={details}
                  showProfileUID={showProfileUID}
                  className="profile-column"
                />
              </div>
            )}
          </div>
        ) : (
          <Settings details={details} setShowSettings={setShowSettings} />
        )
      ) : (
        <div>Data loading</div>
      )}
    </>
  );
}
