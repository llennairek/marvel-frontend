import React from "react";
import "./Home.css";

function Home() {
  return (
    <main className="main-home">
      <p>
        Welcome to the <span>MARVEL</span> universe
      </p>
      <p>
        Everything about <span className="red">comics</span> and their{" "}
        <span className="red">characters</span>
      </p>
    </main>
  );
}

export default Home;
