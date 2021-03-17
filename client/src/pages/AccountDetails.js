import React, { useState, useEffect } from "react";
import { app, firebaseAuth } from "../base";

export default function AccountDetails() {
  const db = app.firestore();
  const current = firebaseAuth.currentUser.email;

  useEffect(() => {
    db.collection("users")
      .doc(current)
      .get()
      .then((snapshot) => console.log(snapshot.docs));
  }, []);

  return <div>hi</div>;
}
