import React from "react";
import "./Buttons.css";

export const OwnPetModalCloseBtn = props => (
    <button {...props} className="btn btn-lg pet-close-modal">
      {props.children}
    </button>
);