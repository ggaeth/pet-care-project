import React from "react";

export const CreateBtn = props => (
  <div className="row">
    <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  </div>
);