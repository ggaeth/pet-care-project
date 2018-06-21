import React from "react";
import Create from "../../pages/Create";

export const CreateAcctBtn = props => (
  <div className="row">
    {/* <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button> */}
    <button {...props} type="button" className=" CreateAcctBtn btn" data-toggle="modal" data-target="#createModal">
      {props.children}
    </button>
  </div>
);

