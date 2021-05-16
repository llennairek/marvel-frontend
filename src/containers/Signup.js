import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Signup.css";

function Signup({
  userToken,
  setUserToken,
  handleToken,
  userInfos,
  setUserInfos,
}) {
  const [username, setUsername] = useState("");
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
      const response = await axios.post("http://localhost:3001/user/signup", {
        username,
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
    <main className="main-signup">
      {modal ? (
        <div className="modal">
          <p>
            Welcome aboard <span className="bold">{userInfos.username}</span>
          </p>
          <p>You will be redirected to the homepage in a few seconds</p>
        </div>
      ) : null}

      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <p className={error ? "error" : "error hidden"}>** {errorMessage} **</p>
        <input
          type="text"
          name="signup-name"
          id="signup-name"
          placeholder="Your username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          name="signup-email"
          id="signup-email"
          placeholder="Your email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="signup-password"
          id="signup-password"
          placeholder="Your password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="button-red" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </main>
  );
}

export default Signup;
