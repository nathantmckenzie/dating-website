import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";

export default function Profile({ showProfileUID, details }) {
  const [profile, setProfile] = useState();
  const db = app.firestore();
  let firebaseData;

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  return (
    <div className="profile-column">
      {profile ? (
        <>
          {console.log("FILTERED", filtered)}
          Profile {console.log("PROFILE", profile)}
          <img src={profile.avatar} width="100%" height="400" />
          <h2>{profile.firstName}</h2>
          <div>{profile.personality}</div>
        </>
      ) : null}
    </div>
  );
}
