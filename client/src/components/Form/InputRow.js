import React from "react";

export const InputRow = props => (
  <div className="form-group row">
    <label className={props.collabel} htmlFor={props.forattribute}>{props.title}</label>
    <div className={props.coldiv}>
      <input className="form-control" id={props.forattribute} {...props} />
    </div>
  </div>
);
