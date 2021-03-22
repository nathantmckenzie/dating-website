import React, { useState, useEffect } from "react";
import profilesObject from "../profiles-objects.js";
import Bobby from "../pictures/bobby.jpeg";
import Matches from "./Matches";
import TinderCard from "react-tinder-card";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function Swipe() {
  const [profile, setProfile] = useState({
    name: profilesObject[0].name,
    location: profilesObject[0].location,
    age: profilesObject[0].age,
    picture: profilesObject[0].picture,
  });
  const [possibleMatches, setPossibleMatches] = useState([
    { name: "Bobby", age: 26, location: "Vancouver", picture: Bobby },
  ]);
  const [rejects, setRejects] = useState([
    { name: "Wilma", age: 90, location: "Palm Springs", picture: Bobby },
  ]);

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
    setRejects([...rejects, profilesObject[0]]);
    profilesObject.shift();
    setProfile(profilesObject[0]);
    console.log("Rejects", rejects);
  };

  const swipeRight = () => {
    setPossibleMatches([...possibleMatches, profilesObject[0]]);
    profilesObject.shift();
    setProfile(profilesObject[0]);
    console.log("Possible Matches", possibleMatches);
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
    <>
      {profilesObject.length > 1 ? (
        <>
          <div className="swipe-profile" key={makeid(5)}>
            <TinderCard preventSwipe={["up", "down"]} onSwipe={onSwipe}>
              <img
                src={profile.picture}
                width="500"
                height="500"
                className="profile-picture"
              />
              <br />
              <div>{profile.name}</div>
              <div>{profile.age}</div>
              <div>{profile.location}</div>
            </TinderCard>
          </div>
          <div className="swipe-buttons">
            <button onClick={swipeLeft}>Swipe Left</button>
            <button onClick={swipeRight}>Swipe Right</button>
            <FavoriteIcon />
          </div>
        </>
      ) : (
        <div>Sorry! No More Matches In Your Area!</div>
      )}
      <Matches possibleMatches={possibleMatches} />
    </>
  );
}
