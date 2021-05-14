import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import logout from "../../assets/logoutV2.png";
import { useHistory } from "react-router-dom";

function Header({ userToken, userInfos, handleToken, setUserInfos }) {
  const [modal, setModal] = useState(false);

  let history = useHistory();

  const handleLogout = () => {
    handleToken(null);
    setModal(false);
    setUserInfos({});
    history.push("/");
  };

  return (
    <header>
      {modal ? (
        <div className="modal">
          <p>
            Do you want to logout{" "}
            <span className="bold">{userInfos.username}</span> ?
          </p>
          <div className="logout-buttons-container">
            <button className="button-black" onClick={() => setModal(false)}>
              No
            </button>
            <button className="button-red" onClick={handleLogout}>
              Yes
            </button>
          </div>
        </div>
      ) : null}
      <nav>
        {userToken ? (
          <div className="link-wrapper">
            <img
              src={logout}
              alt="logout"
              className="logout-icon"
              onClick={() => setModal(true)}
            />
            <span className="user-header">Hello {userInfos.username} !</span>
          </div>
        ) : (
          <div className="link-wrapper">
            <Link to="/login">Login | Signup</Link>
          </div>
        )}

        <div className="link-wrapper">
          <Link to="/personnages">Characters</Link>
        </div>
        <Link to="/" className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="link-wrapper">
          <Link to="/comics">Comics</Link>
        </div>
        <div className="link-wrapper">
          <Link to="/favoris">Favorites</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
