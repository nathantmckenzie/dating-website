import React from "react";
import { useHistory } from "react-router-dom";

export default function Matches({ possibleMatches }) {
  const history = useHistory();

  const clickHandler = () => {
    history.push("/chat");
  };

  return (
    <div>
      <h3>Matches</h3>
      <br />
      <div className="all-matches" pre>
        {possibleMatches.map((possibleMatch) => {
          return (
            <div className="match-picture-name">
              <img
                src={possibleMatch.picture}
                width="100"
                height="100"
                className="match-picture"
              />
              <div>{possibleMatch.name} </div>
            </div>
          );
        })}
      </div>
      <br />
      <h3>Messages</h3>
      <div className="all-messages" pre>
        {possibleMatches.map((possibleMatch) => {
          return (
            <div className="match-picture-message" onClick={clickHandler}>
              <img
                src={possibleMatch.picture}
                width="100"
                height="100"
                className="match-picture"
              />
              <div className="match-text">
                <h3>{possibleMatch.name} </h3>
                <h5>Hey cutie</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
