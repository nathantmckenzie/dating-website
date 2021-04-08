import React from "react";
import { useHistory } from "react-router-dom";

export default function SettingsSidebar({ setShowSettings }) {
  let history = useHistory();

  return (
    <div className="settings-sidebar">
      <button onClick={() => history.push("/swipefirebase")}>Return</button>
    </div>
  );
}
