import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import logout from "../../assets/logoutV2.png";
import { useHistory } from "react-router-dom";

function Header({
  userToken,
  userInfos,
  handleToken,
  setUserInfos,
  modalFavorites,
  setModalFavorites,
}) {
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
      {modalFavorites ? (
        <div className="modal modal-favorites">
          <div
            className="close-modal-favorites"
            onClick={() => {
              setModalFavorites(false);
            }}
          >
            X
          </div>
          <p>
            You have to be logged to add{" "}
            <span className="white">favorites</span> !<br />
            If you do not have an account yet go to the signup page
          </p>
          <div className="logout-buttons-container">
            <Link
              className="button-black"
              to="/signup"
              onClick={() => {
                setModalFavorites(false);
              }}
            >
              Signup
            </Link>
            <Link
              className="button-red"
              to="/login"
              onClick={() => {
                setModalFavorites(false);
              }}
            >
              Login
            </Link>
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
