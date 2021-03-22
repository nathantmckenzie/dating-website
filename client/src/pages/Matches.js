import React from "react";
import { useHistory } from "react-router-dom";

export default function Matches({ possibleMatches, details }) {
  const history = useHistory();

  const clickHandler = () => {
    history.push("/chat");
  };

  console.log("DETAILS", details);

  return (
    <div>
      <h3>Matches</h3>
      <br />
      <div className="all-matches" pre>
        {details.map((detail) => {
          return (
            <div className="match-picture-name">
              <img
                src={detail.avatar}
                width="100"
                height="100"
                className="match-picture"
                onClick={clickHandler}
              />
              <h4 className="match-name">{detail.firstName} </h4>
            </div>
          );
        })}
      </div>
      <br />
      <h3>Messages</h3>
      <div className="all-messages" pre>
        {details.map((detail) => {
          return (
            <div className="match-picture-message" onClick={clickHandler}>
              <img
                src={detail.avatar}
                width="100"
                height="100"
                className="match-picture"
              />
              <div className="match-text">
                <h3>{detail.firstName} </h3>
                <h5>Hey cutie</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
