import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Chat from "./Chat";

export default function Matches({ possibleMatches, details }) {
  const history = useHistory();
  const [showMatches, setShowMatches] = useState(true);

  console.log("DETAILS", details);

  return (
    <div>
      <div className="page-titles">
        <h3
          className={showMatches ? "matches-title-clicked" : null}
          onClick={() => setShowMatches(true)}
        >
          Matches
        </h3>
        <h3
          className={showMatches ? null : "messages-title-clicked"}
          onClick={() => setShowMatches(false)}
        >
          Messages
        </h3>
      </div>
      <br />
      {showMatches ? (
        <div className="all-matches" pre>
          {details.map((detail) => {
            return (
              <div className="match-picture-name">
                <img
                  src={detail.avatar}
                  width="100"
                  height="100"
                  className="match-picture"
                />
                <h4 className="match-name">{detail.firstName} </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="all-messages" pre>
          {details.map((detail) => {
            return (
              <div className="match-picture-message">
                <img
                  src={detail.avatar}
                  width="100"
                  height="100"
                  className="message-picture"
                />
                <div className="match-text">
                  <h3>{detail.firstName} </h3>
                  <h5>Hey cutie</h5>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
