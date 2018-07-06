import React from "react";
import "./Buttons.css";

export const PetViewBtn = props => (
  <div className="row pet-view-btn-margin">
    <div className={props.coldiv}>
      <button {...props} className="btn btn-lg pet-view-btn">
        {props.children}
      </button>
    </div>
  </div>
);