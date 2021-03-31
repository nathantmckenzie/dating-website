import React from "react";
import SettingsSidebar from "./SettingsSidebar";
import PictureSettings from "./PictureSettings";

export default function Settings({ details }) {
  return (
    <div className="settings-container">
      <SettingsSidebar />
      <PictureSettings details={details} />
    </div>
  );
}
