import React from "react";
import {NavLink} from "reactstrap"
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <a className="navbar-brand" href="/">
      Pet Purfect
    </a>
    <NavLink href="/about/">About</NavLink>
    <NavLink href="/">Signout</NavLink>
  </nav>
);

export default Nav;

