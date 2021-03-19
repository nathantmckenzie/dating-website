import React, { useState, useEffect } from "react";
import Bobby from "../pictures/bobby.jpeg";
import Matches from "./Matches";
import TinderCard from "react-tinder-card";
import { app, firebaseAuth } from "../base";

export default function SwipeFirebase() {
  const [details, setDetails] = useState();
  const [matchMessage, setMatchMessage] = useState(false);
  const db = app.firestore();
  const currentName = firebaseAuth.currentUser.firstName;

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

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const swipeLeft = () => {
    db.collection("swipes")
      .doc(makeid(20))
      .set(
        {
          by_user: currentName,
          to_user: details[0].firstName,
          swipe_right: false,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      });

    setDetails(details.filter((detail) => detail !== details[0]));
  };

  const swipeRight = () => {
    db.collection("swipes")
      .doc(makeid(20))
      .set(
        {
          by_user: currentName,
          to_user: details[0].firstName,
          swipe_right: true,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      });

    db.collection("swipes")
      .where("by_user", "==", details[0].firstName)
      .where("to_user", "==", currentName)
      .where("is_right", "==", true)
      .get()
      .then(console.log("LET'S GO"))
      .then(() => {
        setMatchMessage(true);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    setDetails(details.filter((detail) => detail !== details[0]));
  };

  const onSwipe = (direction) => {
    console.log("You siped: " + direction);
    if (direction === "right") {
      swipeRight();
    } else if (direction === "left") {
      swipeLeft();
    }
  };

  return (
    <div>
      {console.log("DETaILS", details)}
      {matchMessage === false ? (
        <>
          {console.log("details", details)}
          <img src={details[0].avatar} height="300" width="300" />
          <h3>{details[0].firstName}</h3>
          <h3>{details[0].personality}</h3>
          <button onClick={swipeLeft}>Swipe Left</button>
          <button onClick={swipeRight}>Swipe Right</button>
        </>
      ) : (
        <h4>It's a match!</h4>
      )}
    </div>
  );
}
