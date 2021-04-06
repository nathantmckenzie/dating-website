import React, { useEffect, useState } from "react";
import { app, firebaseAuth } from "../base";
import firebase from "firebase";
import selectPhoto from "../pictures/select-photo.png";
import { useHistory } from "react-router-dom";

export default function AddPhoto() {
  const [fileUrl, setFileUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState([]);
  const [bio, setBio] = useState();

  const history = useHistory();
  const db = app.firestore();
  const currentUID = firebaseAuth.currentUser.uid;

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) {
      return;
    }
    await db
      .collection("users")
      .doc(currentUID)
      .set(
        {
          // avatar: [fileUrl],
          avatar: firebase.firestore.FieldValue.arrayUnion(fileUrl),
        },
        { merge: true }
      );
    await history.push("/swipefirebase");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("users").get();
      console.log("AY", usersCollection.docs);
      setUsers(
        usersCollection.docs.map((doc) => {
          console.log("DOC DATA BABY", doc.data());
          return doc.data();
        })
      );
      console.log("usersCollection.docs", usersCollection.docs[0].data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("new photoooo");
  }, [fileUrl]);

  return (
    <div>
      <div className="picture-bio-settings">
        <div className="settings-card">
          <div className="create-photo-div">
            <h4 className="create-photo-title">Adjust</h4>
            <h4 className="create-upload-button" onClick={onSubmit}>
              Done
            </h4>
          </div>
          <div className="select-photo-image">
            <form>
              <label>
                <div>
                  <img
                    src={fileUrl ? fileUrl : selectPhoto}
                    className="select-image"
                  />
                </div>
                <input
                  type="file"
                  onChange={onFileChange}
                  className="add-image-form"
                />
              </label>
            </form>
          </div>
          <button>Zoom In</button>
        </div>
      </div>
    </div>
  );
}
