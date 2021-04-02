import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import firebase from "firebase";

export default function EditInfo({ setEditInfo, details, setAddPhoto }) {
  const [profile, setProfile] = useState();
  const [bio, setBio] = useState();

  const db = app.firestore();
  const current = firebaseAuth.currentUser.email;

  let filtered = details.filter(
    (detail) => detail.uid === "a484KBMpC4O1m3ICjeBnBcboEjc2"
  )[0];

  useEffect(() => {
    setProfile(filtered);
    // console.log("Profile.bio: ", profile.bio);
    if (profile && profile.bio) {
      setBio(profile.bio);
    }
  }, [filtered, profile]);

  const updateProfile = async (e) => {
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

  const deletePicture = async (e) => {
    e.preventDefault();

    await db
      .collection("users")
      .doc(current)
      .update({
        avatar: firebase.firestore.FieldValue.arrayRemove(profile.avatar[0]),
      });
  };

  return (
    <div className="picture-bio-settings">
      {profile ? (
        <div className="settings-card">
          <div className="all-pictures-settings">
            <div>
              <img className="picture-settings" src={profile.avatar[0]} />
              <div className="delete-picture-button">
                <HighlightOffIcon onClick={deletePicture} />
              </div>
            </div>
            <img className="picture-settings" src={profile.avatar[1]} />
            <img className="picture-settings" src={profile.avatar[2]} />
            <img className="picture-settings" src={profile.avatar[3]} />
            <img
              className="picture-settings"
              src={profile.avatar[4] ? profile.avatar[4] : <div>hi</div>}
            />
          </div>
          <div className="add-media-button">
            <button onClick={() => setAddPhoto(true)}>ADD MEDIA</button>
          </div>
          <h4 className="bio-label">About {profile.firstName}</h4>
          <textarea
            className="bio-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button onClick={updateProfile}>Save</button>
          <div className="test-div">TEST</div>
        </div>
      ) : null}
    </div>
  );
}
