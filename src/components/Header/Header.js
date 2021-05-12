import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/personnages">personnages</Link>
      <Link to="/comics">comics</Link>
      <Link to="/favoris">favoris</Link>
    </header>
  );
}

export default Header;
