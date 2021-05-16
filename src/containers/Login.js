import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login({
  userToken,
  setUserToken,
  handleToken,
  userInfos,
  setUserInfos,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);

  let history = useHistory();
  let timer;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password,
      });
      handleToken(response.data.token);
      setUserInfos({
        username: response.data.username,
        _id: response.data._id,
        favorites: response.data.favorites,
      });
      setModal(true);
      timer = setTimeout(() => {
        setModal(false);
        history.push("/");
      }, 2500);
    } catch (error) {
      console.error(error.response.data.message);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <main className="main-login">
      {modal ? (
        <div className="modal">
          <p>
            Welcome back <span className="bold">{userInfos.username}</span>
          </p>
          <p>You will be redirected to the homepage in a few seconds</p>
        </div>
      ) : null}
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p className={error ? "error" : "error hidden"}>** {errorMessage} **</p>
        <input
          type="email"
          name="login-email"
          id="login-email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="login-password"
          id="login-password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="button-red login"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
      <p className="red" style={{ textAlign: "center" }}>
        You do not have an account yet ?<br />
        Click <span className="white">below</span> !
      </p>
      <Link
        to="/signup"
        className="button-black signup"
        style={{ textAlign: "center" }}
      >
        Signup by clicking here!
      </Link>
    </main>
  );
}

export default Login;
