import React, { useState, useEffect } from "react";
import { app } from "../base";

export default function Profile({ showProfileUID, details }) {
  const [profile, setProfile] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const [pictureNumber, setPictureNumber] = useState(1);
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

  function nextPicture(pics) {
    setPictureNumber(pictureNumber + 1);
    console.log("PICTURE NUMBER", pictureNumber);
    setCurrentPicture(pics[pictureNumber]);
  }

  function previousPicture(pics) {
    setPictureNumber(pictureNumber - 1);
    console.log("PICTURE NUMBER", pictureNumber);
    setCurrentPicture(pics[pictureNumber]);
  }

  return (
    <div className="profile-column">
      {profile ? (
        <>
          <img src={currentPicture} className="profile-picture-rightside" />
          <button onClick={() => previousPicture(profile.avatar)}>
            previous pics
          </button>
          <button onClick={() => nextPicture(profile.avatar)}>more pics</button>
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
