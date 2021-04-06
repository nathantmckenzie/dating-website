import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function SettingsNavBar({ details, setShowSettings }) {
  const [profile, setProfile] = useState();
  let history = useHistory();

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  return (
    <div>
      {profile ? (
        <div
          className="settings-navbar"
          onClick={() => history.push("/settings")}
        >
          <img
            src={profile.avatar[0]}
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
      ) : null}
    </div>
  );
}
