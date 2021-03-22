import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { app, firebaseAuth } from "../base";
import Matches from "./Matches";

export default function SwipeFirebase() {
  const [details, setDetails] = useState();
  const [matchMessage, setMatchMessage] = useState(false);
  const db = app.firestore();
  const currentEmail = firebaseAuth.currentUser.email;

  useEffect(() => {
    let firebaseData;
    db.collection("users")
      .get()
      .then(function (querySnapshot) {
        firebaseData = querySnapshot.docs.map(function (doc) {
          // doc.id

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
          by_user: currentEmail,
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
    let id = makeid(20);

    db.collection("swipes")
      .doc(id)
      .set(
        {
          by_user: currentEmail,
          to_user: details[0].firstName,
          swipe_right: true,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
      });

    db.collection("users").doc(currentEmail).set(
      {
        match_id: id,
      },
      { merge: true }
    );

    db.collection("swipes")
      .where("by_user", "==", details[0].firstName)
      .where("swipe_right", "==", true)
      .where("to_user", "==", currentEmail)
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
      {details ? (
        <>
          <div className="swipe-profile">
            <TinderCard preventSwipe={["up", "down"]} onSwipe={onSwipe}>
              {console.log("details", details)}
              <img
                src={details[0].avatar}
                height="500"
                width="500"
                className="profile-picture"
              />
              <h3>{details[0].firstName}</h3>
              <h3>{details[0].personality}</h3>
            </TinderCard>
            <button onClick={swipeLeft}>Swipe Left</button>
            <button onClick={swipeRight}>Swipe Right</button>
          </div>
          <Matches details={details} />
        </>
      ) : (
        <div>Data loading</div>
      )}
    </div>
  );
}
