import React from "react";

const Jumbotron = props => (
  <div
    style={{ clear: "both", textAlign: "center" }}
    className="jumbotron"
  >
    {props.value}
    {props.children}
  </div>
);

export default Jumbotron;
