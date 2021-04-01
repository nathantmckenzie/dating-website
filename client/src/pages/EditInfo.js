import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";
import firebase from "firebase";

export default function EditInfo({ setEditInfo, details }) {
  const [profile, setProfile] = useState();
  const [bio, setBio] = useState(profile ? profile.bio : null);

  const db = app.firestore();
  const current = firebaseAuth.currentUser.email;

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
  }, []);

  const onClick = async (e) => {
    e.preventDefault();

    await db.collection("users").doc(current).set(
      {
        // avatar: [fileUrl]
        bio: bio,
      },
      { merge: true }
    );
    window.location.reload();
  };

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
          <h4 className="bio-label">About {profile.firstName}</h4>
          <textarea
            className="bio-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button onClick={onClick}>Save</button>
          <div className="test-div">TEST</div>
        </div>
      ) : null}
    </div>
  );
}
