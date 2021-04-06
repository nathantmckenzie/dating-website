import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";
import ArrowForwardIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";

export default function Profile({ showProfileUID, details }) {
  const [profile, setProfile] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const [pictureNumber, setPictureNumber] = useState(0);
  const currentUID = firebaseAuth.currentUser.uid;
  const db = app.firestore();

  let filtered = details.filter((detail) => detail.uid === currentUID)[0];

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
          <div className="profile-picture-previous-next-buttons-container">
            <img src={currentPicture} className="profile-picture-rightside" />
            <ArrowBackIcon
              onClick={pictureNumber > 0 ? previousPicture : null}
              className={
                pictureNumber > 0
                  ? "previous-picture-button"
                  : "hide-previous-picture-button"
              }
            />
            <ArrowForwardIcon
              onClick={
                pictureNumber < profile.avatar.length - 1 ? nextPicture : null
              }
              className={
                pictureNumber < profile.avatar.length - 1
                  ? "next-picture-button"
                  : "hide-next-picture-button"
              }
            />
          </div>
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
