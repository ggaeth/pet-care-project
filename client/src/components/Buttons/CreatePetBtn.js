import React from "react";

export const CreatePetBtn = props => (
  <div className="row">
    <button {...props} style={{ marginBottom: 10 }} className="createpetbtn btn btn-lg">
      {props.children}
    </button>
  </div>
);