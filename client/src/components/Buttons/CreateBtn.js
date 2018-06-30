import React from "react";

export const CreateBtn = props => (
  <div className="row">
    <button {...props} style={{ marginBottom: 10 }} className="createbtn btn btn-lg">
      {props.children}
    </button>
  </div>
);