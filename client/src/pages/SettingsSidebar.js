import React from "react";

export default function SettingsSidebar({ setShowSettings }) {
  return (
    <div className="settings-sidebar">
      Settings Sidebar{" "}
      <button onClick={() => setShowSettings(false)}>Return</button>
    </div>
  );
}
