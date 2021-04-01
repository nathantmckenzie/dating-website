import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import PictureSettings from "./PictureSettings";
import EditInfo from "./EditInfo";

export default function Settings({ details, setShowSettings }) {
  const [editInfo, setEditInfo] = useState(false);

  return (
    <div className="settings-container">
      <SettingsSidebar setShowSettings={setShowSettings} />
      {!editInfo ? (
        <PictureSettings details={details} setEditInfo={setEditInfo} />
      ) : (
        <EditInfo details={details} setEditInfo={setEditInfo} />
      )}
    </div>
  );
}
