import React, { useState, useEffect } from "react";
import { app } from "../base";

export default function Profile({ showProfileUID, details }) {
  const [profile, setProfile] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const [pictureNumber, setPictureNumber] = useState(0);
  const db = app.firestore();

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  useEffect(() => {
    if (profile) {
      setCurrentPicture(profile.avatar[0]);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setCurrentPicture(profile.avatar[pictureNumber]);
    }
  }, [profile, pictureNumber]);

  function nextPicture() {
    setPictureNumber((prevState) => prevState + 1);
  }

  function previousPicture() {
    setPictureNumber((prevState) => prevState - 1);
  }

  return (
    <div className="profile-column">
      {profile ? (
        <>
          {console.log("AVATAR LENGTH", profile.avatar.length)}
          <img src={currentPicture} className="profile-picture-rightside" />
          <button
            onClick={pictureNumber > 0 ? previousPicture : null}
            className={
              pictureNumber > 0
                ? "previous-picture-button"
                : "hide-previous-picture-button"
            }
          >
            previous pics
          </button>
          <button
            onClick={
              pictureNumber < profile.avatar.length - 1 ? nextPicture : null
            }
            className={
              pictureNumber < profile.avatar.length - 1
                ? "next-picture-button"
                : "hide-next-picture-button"
            }
          >
            more pics
          </button>
          <div className="profile-info">
            <h2>{profile.firstName}</h2>
            <h4>{profile.personality}</h4>
            <div>{profile.bio}</div>
          </div>
          <div className="report-unmatch">
            <button className="unmatch-button">UNMATCH</button>
            <button className="report-button">REPORT</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
