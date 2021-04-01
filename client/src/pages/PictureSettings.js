import React, { useState, useEffect } from "react";

export default function PictureSettings({ details, setEditInfo }) {
  const [profile, setProfile] = useState();

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  return (
    <div className="picture-bio-settings">
      {profile ? (
        <div className="settings-card">
          <div className="picture-settings">
            <img
              className="picture-settings"
              src={profile.avatar[0]}
              width="450"
              height="450"
            />
          </div>
          <h2 className="settings-name">{profile.firstName}</h2>
          <div className="edit-info-button">
            <button onClick={() => setEditInfo(true)}>Edit Info</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
