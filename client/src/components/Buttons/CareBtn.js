import React from "react";

export const CareBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className="caregiverbtn btn btn-lg">
      {props.children}
    </button>
  </div>
);