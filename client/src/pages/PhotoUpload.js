import React, { useEffect, useState } from "react";
import { app, firebaseAuth } from "../base";
import firebase from "firebase";

function PhotoUpload() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [photos, setPhotos] = useState([]);
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
    <>
      {test}
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <br />
        <textarea
          type="text"
          name="bio"
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.name}>
              <img width="300" height="400" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default PhotoUpload;
