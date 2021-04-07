import React, { useState, useEffect } from "react";
import noProfilePicture from "../pictures/no-profile-picture.png";
import { app, firebaseAuth } from "../base";

export default function PictureSettings({ details, setEditInfo }) {
  const [profile, setProfile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const currentUID = firebaseAuth.currentUser.uid;

  let filtered = details.filter((detail) => detail.uid === currentUID);

  useEffect(() => {
    setProfile(filtered);
  }, []);

  useEffect(() => {
    if (profile) {
      setProfilePicture(
        profile[0].avatar ? profile[0].avatar[0] : noProfilePicture
      );
    }
  }, [profile]);

  return (
    <div className="picture-bio-settings">
      {profile ? (
        <div className="settings-card">
          <div className="picture-settings">
            {console.log("profile bb", profile)}
            <img
              className="picture-settings"
              src={profilePicture}
              width="450"
              height="450"
            />
          </div>
          <h2 className="settings-name">{profile.firstName}</h2>
          <h5 className="settings-bio">{profile.bio}</h5>
          <div className="edit-info-button">
            <button onClick={() => setEditInfo(true)}>Edit Info</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
