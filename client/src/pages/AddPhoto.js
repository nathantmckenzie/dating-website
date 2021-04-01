import React, { useEffect, useState } from "react";
import selectPhoto from "../pictures/select-photo.png";

export default function AddPhoto() {
  return (
    <div>
      <div className="picture-bio-settings">
        <div className="settings-card">
          <div className="select-photo-image">
            <img src={selectPhoto} className="select-image-border-radius" />
          </div>
        </div>
      </div>
    </div>
  );
}
