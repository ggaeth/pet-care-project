import React from "react";

export const TextArea = props => (
  <div className="form-group">
    <label htmlFor={props.forattribute}>{props.title}</label>
    <textarea className="form-control" rows="5" id={props.forattribute} {...props} />
  </div>
);
