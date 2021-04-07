import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";
import { useHistory } from "react-router-dom";
import DeletePictureIcon from "@material-ui/icons/HighlightOff";
import firebase from "firebase";

export default function EditInfo({ setEditInfo, details, setAddPhoto }) {
  const [profile, setProfile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [bio, setBio] = useState();

  const history = useHistory();
  const currentUID = firebaseAuth.currentUser.uid;
  const db = app.firestore();
  let filtered = details.filter((detail) => detail.uid === currentUID);

  useEffect(() => {
    console.log("filtered", filtered);
    setProfile(filtered);
    // console.log("Profile.bio: ", profile.bio);
    if (profile && profile.bio) {
      setBio(profile.bio);
      console.log("PROFILE BABY", profile);
    }
    console.log("PROFILE BABY", profile);
  }, [filtered, profile]);

  useEffect(() => {
    if (profile) {
      setProfilePicture(profile[0].avatar);
    }
  }, [profile]);

  const updateProfile = async (e) => {
    e.preventDefault();

    await db.collection("users").doc(currentUID).set(
      {
        // avatar: [fileUrl]
        bio: bio,
      },
      { merge: true }
    );
    await history.push("/swipefirebase");
  };

  const deletePicture = async (e) => {
    e.preventDefault();

    await db
      .collection("users")
      .doc(currentUID)
      .update({
        avatar: firebase.firestore.FieldValue.arrayRemove(profile.avatar[0]),
      });
    window.location.reload();
  };

  return (
    <div className="picture-bio-settings">
      {profile ? (
        <div className="settings-card">
          <div className="all-pictures-settings">
            <div>
              <img
                className="picture-settings"
                src={profilePicture ? profilePicture[0] : null}
              />
              <div className="delete-picture-button">
                <DeletePictureIcon
                  onClick={deletePicture}
                  className="delete-picture-button"
                />
              </div>
            </div>
            <img
              className="picture-settings"
              src={profilePicture ? profilePicture[1] : null}
            />
            <img
              className="picture-settings"
              src={profile.avatar ? profile.avatar[2] : null}
            />
            <img
              className="picture-settings"
              src={profile.avatar ? profile.avatar[3] : null}
            />
            <img
              className="picture-settings"
              src={profile.avatar ? profile.avatar[4] : null}
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
