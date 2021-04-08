import React, { useState, useEffect } from "react";
import noProfilePicture from "../pictures/no-profile-picture.png";
import { useHistory } from "react-router-dom";
import { app, firebaseAuth } from "../base";

export default function SettingsNavBar({ details, setShowSettings }) {
  const [profile, setProfile] = useState();

  let history = useHistory();
  const currentUID = firebaseAuth.currentUser.uid;
  console.log("CURRENT UID", currentUID);

  let filtered = details.filter((detail) => detail.uid === currentUID)[0];

  useEffect(() => {
    setProfile(filtered);
  }, [filtered]);

  return (
    <div>
      {profile ? (
        <div
          className="settings-navbar"
          onClick={() => history.push("/settings")}
        >
          <img
            src={profile.avatar ? profile.avatar[0] : noProfilePicture}
            className="settings-picture"
            onClick={() => setShowSettings(true)}
          />
          <div
            className="my-profile-text"
            onClick={() => setShowSettings(true)}
          >
            My Profile
          </div>
        </div>
      ) : (
        <div
          className="settings-navbar"
          onClick={() => history.push("/settings")}
        >
          <img
            src={noProfilePicture}
            className="settings-picture"
            onClick={() => setShowSettings(true)}
          />
          <div
            className="my-profile-text"
            onClick={() => setShowSettings(true)}
          >
            My Profile
          </div>
        </div>
      )}
    </div>
  );
}
