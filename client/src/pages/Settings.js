import React, { useState, useEffect } from "react";

export default function Settings({ details }) {
  const [profile, setProfile] = useState();

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  return (
    <div>
      {profile ? (
        <div className="settings-navbar">
          <img
            src={profile.avatar[0]}
            className="settings-picture"
            width="50"
            height="50"
          />
          <div className="my-profile-text">My Profile</div>
        </div>
      ) : null}
    </div>
  );
}
