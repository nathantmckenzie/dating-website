import React, { useState, useEffect } from "react";
import Bobby from "../pictures/bobby.jpeg";
import Matches from "./Matches";
import TinderCard from "react-tinder-card";
import { app, firebaseAuth } from "../base";

export default function SwipeFirebase() {
  const [details, setDetails] = useState();
  const db = app.firestore();

  useEffect(() => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.docs.map(function (doc) {
          setDetails(doc.data());
        });
      });
  }, []);

  const swipeLeft = () => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
        });
      });
  };

  const swipeRight = () => {
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data());
        });
      });
  };

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
    if (direction === "right") {
      swipeRight();
    } else if (direction === "left") {
      swipeLeft();
    }
  };

  return (
    <div>
      <img src={details.avatar} height="300" width="300" />
      <h3>{details.firstName}</h3>
      <button onClick={swipeRight}>swipe</button>
    </div>
  );
}
