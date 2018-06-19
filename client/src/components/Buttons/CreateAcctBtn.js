import React from "react";
import Create from "../../pages/Create";

export const CreateAcctBtn = props => (
  <div className="row text-center">
    {/* <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button> */}
    <button {...props} type="button" className="btn btn-success" data-toggle="modal" data-target="#createModal">
      {props.children}
    </button>
  </div>
);

