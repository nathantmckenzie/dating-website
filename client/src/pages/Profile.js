import React, { useState, useEffect } from "react";
import { app } from "../base";

export default function Profile({ showProfileUID, details }) {
  const [profile, setProfile] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const db = app.firestore();

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  let i = 0;
  function nextPicture(pics) {
    setCurrentPicture(pics[i]);
    i++;
  }

  return (
    <div className="profile-column">
      {profile ? (
        <>
          {console.log("FILTERED", filtered)}
          <img src={currentPicture} width="100%" height="400" />
          <button>previous pics</button>
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
