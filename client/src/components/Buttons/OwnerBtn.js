import React from "react";

export const OwnerBtn = props => (
  <div className="row text-center">
    <button {...props} style={{ marginBottom: 10 }} className=" ownerbtn btn btn-lg">
      {props.children}
    </button>
  </div>
);