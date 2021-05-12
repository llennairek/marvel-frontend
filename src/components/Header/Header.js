import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";

function Header() {
  return (
    <header>
      <nav>
        <div className="link-wrapper">
          <Link to="/">Home</Link>
        </div>
        <div className="link-wrapper">
          <Link to="/personnages">Personnages</Link>
        </div>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="link-wrapper">
          <Link to="/comics">Comics</Link>
        </div>
        <div className="link-wrapper">
          <Link to="/favoris">Favoris</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
