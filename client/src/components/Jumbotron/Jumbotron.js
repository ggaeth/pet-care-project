import React from "react";
import "./Jumbotron.css";

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
