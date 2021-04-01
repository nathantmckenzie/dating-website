import React, { useEffect, useState } from "react";
import { app, firebaseAuth } from "../base";
import firebase from "firebase";
import selectPhoto from "../pictures/select-photo.png";

export default function AddPhoto() {
  const [fileUrl, setFileUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState([]);
  const [bio, setBio] = useState();

  const db = app.firestore();
  const current = firebaseAuth.currentUser.email;
  const currentUid = firebaseAuth.currentUser.uid;

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    setTest([...test, fileUrl]);
    if (!username || !fileUrl) {
      return;
    }
    await db
      .collection("users")
      .doc(current)
      .set(
        {
          // avatar: [fileUrl],
          avatar: firebase.firestore.FieldValue.arrayUnion(fileUrl),
          uid: currentUid,
          bio: bio,
        },
        { merge: true }
      );
    window.location.reload();
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

  return (
    <div>
      <div className="picture-bio-settings">
        <div className="settings-card">
          <div className="select-photo-image">
            <img src={selectPhoto} className="select-image-border-radius" />
            <form>
              <label>
                Upload
                <input
                  type="file"
                  onChange={onFileChange}
                  className="add-image-form"
                />
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
