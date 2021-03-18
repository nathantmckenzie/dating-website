import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";

export default function AccountDetails({ result, setResult }) {
  const [details, setDetails] = useState({});

  const db = app.firestore();
  const current = firebaseAuth.currentUser.email;
  console.log("current", current);

  useEffect(() => {
    db.collection("users")
      .doc(current)
      .get()
      .then((doc) => {
        setDetails(doc.data());
      });
  }, []);

  return <div>{console.log("details", details)}</div>;
}
