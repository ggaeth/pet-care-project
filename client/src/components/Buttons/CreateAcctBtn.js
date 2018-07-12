import React from "react";

export const CreateAcctBtn = props => (
  <div className="row">
    <button {...props} type="button" className=" CreateAcctBtn btn" data-toggle="modal" data-target="#createModal">
      {props.children}
    </button>
  </div>
);

