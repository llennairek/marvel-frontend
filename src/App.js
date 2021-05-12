import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";
import Home from "./containers/Home";
import Character from "./containers/Character";
import Footer from "./containers/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/personnages">
          <Characters />
        </Route>
        <Route path="/favoris">
          <Favorites />
        </Route>
        <Route path="/personnage/:id">
          <Character />
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
