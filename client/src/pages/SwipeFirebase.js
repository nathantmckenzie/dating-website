import React, { useState, useEffect } from "react";
import Bobby from "../pictures/bobby.jpeg";
import Matches from "./Matches";
import TinderCard from "react-tinder-card";
import { app, firebaseAuth } from "../base";

export default function SwipeFirebase() {
  const [details, setDetails] = useState();
  const db = app.firestore();

  useEffect(() => {
    let firebaseData;
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        firebaseData = querySnapshot.docs.map(function (doc) {
          return doc.data();
        });
      })
      .then(() => setDetails(firebaseData));
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
    setDetails(details.filter((detail, index) => detail !== details[0]));
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
      {console.log("DETaILS", details)}
      {details.length > 0 ? (
        <>
          {console.log("details", details)}
          <img src={details[0].avatar} height="300" width="300" />
          <h3>{details[0].firstName}</h3>
          <button onClick={swipeRight}>swipe</button>
        </>
      ) : (
        <h4>Sorry! No More Profiles In Your Area</h4>
      )}
    </div>
  );
}
