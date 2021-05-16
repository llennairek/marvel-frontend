import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import Home from "./containers/Home";
import Character from "./containers/Character";
import Footer from "./containers/Footer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
library.add(faStar, regularStar);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfos, setUserInfos] = useState({});
  const [modalFavorites, setModalFavorites] = useState(false);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userToken) {
        try {
          const response = await axios.get(
            "https://baf-marvel-backend.herokuapp.com/user",
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          setUserInfos(response.data);
        } catch (error) {
          console.error({ error: error.message });
        }
      }
    };

    fetchData();
  }, [userToken]);

  return (
    <Router>
      <Header
        userToken={userToken}
        userInfos={userInfos}
        setUserInfos={setUserInfos}
        handleToken={handleToken}
        modalFavorites={modalFavorites}
        setModalFavorites={setModalFavorites}
      />
      <Switch>
        <Route path="/login">
          <Login
            userToken={userToken}
            setUserToken={setUserToken}
            handleToken={handleToken}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        </Route>
        <Route path="/signup">
          <Signup
            userToken={userToken}
            setUserToken={setUserToken}
            handleToken={handleToken}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />
        </Route>
        <Route path="/comics">
          <Comics
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            modalFavorites={modalFavorites}
            setModalFavorites={setModalFavorites}
          />
        </Route>
        <Route path="/personnages">
          <Characters
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            modalFavorites={modalFavorites}
            setModalFavorites={setModalFavorites}
          />
        </Route>
        <Route path="/favoris">
          <Favorites userInfos={userInfos} setUserInfos={setUserInfos} />
        </Route>
        <Route path="/personnage/:id">
          <Character userInfos={userInfos} setUserInfos={setUserInfos} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
