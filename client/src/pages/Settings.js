import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import PictureSettings from "./PictureSettings";
import EditInfo from "./EditInfo";
import AddPhoto from "./AddPhoto";

export default function Settings({ details, setShowSettings }) {
  const [editInfo, setEditInfo] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);

  return (
    <div className="settings-container">
      <SettingsSidebar setShowSettings={setShowSettings} />
      {!editInfo ? (
        <PictureSettings details={details} setEditInfo={setEditInfo} />
      ) : addPhoto ? (
        <AddPhoto />
      ) : (
        <EditInfo
          details={details}
          setEditInfo={setEditInfo}
          setAddPhoto={setAddPhoto}
        />
      )}
    </div>
  );
}
