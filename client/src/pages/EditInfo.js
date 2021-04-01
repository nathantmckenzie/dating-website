import React, { useState, useEffect } from "react";

export default function EditInfo({ setEditInfo, details }) {
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
          <div className="all-pictures-settings">
            <img
              className="picture-settings"
              src={profile.avatar[0]}
              width="120"
              height="170"
            />
            <img
              className="picture-settings"
              src={profile.avatar[1]}
              width="120"
              height="170"
            />
            <img
              className="picture-settings"
              src={profile.avatar[2]}
              width="120"
              height="170"
            />
            <img
              className="picture-settings"
              src={profile.avatar[3]}
              width="120"
              height="170"
            />
            <img
              className="picture-settings"
              src={profile.avatar[4] ? profile.avatar[4] : <div>hi</div>}
              width="120"
              height="170"
            />
          </div>
          <div className="add-media-button">
            <button onClick={() => setEditInfo(true)}>ADD MEDIA</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
