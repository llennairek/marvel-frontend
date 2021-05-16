import React from "react";
import ItemFlip from "../components/Item/ItemFlip";
import "./Favorites.css";

function Favorites({ userInfos, setUserInfos }) {
  // const [data, setData] = useState(null);

  return (
    <main className="main-favorites-wrapper">
      <h1>
        <span className="underline">FAVORITES</span>
      </h1>
      <div className="main-favorites">
        <div className="characters-favorites-wrapper">
          <h2>Characters</h2>
          <div className="cards-wrapper">
            {Object.keys(userInfos).length > 0 ? (
              userInfos.favorites.characters.map((character) => {
                return (
                  <div key={character._id} className="favorites-item">
                    <ItemFlip
                      data={character}
                      userInfos={userInfos}
                      setUserInfos={setUserInfos}
                      type="character"
                    />
                  </div>
                );
              })
            ) : (
              <p className="error">You have no favorites</p>
            )}
          </div>
        </div>
        <div className="vertical-spacer"></div>
        <div className="comics-favorites-wrapper">
          <h2>Comics</h2>
          <div className="cards-wrapper">
            {Object.keys(userInfos).length > 0 ? (
              userInfos.favorites.comics.map((comic) => {
                return (
                  <div key={comic._id} className="favorites-item">
                    <ItemFlip
                      data={comic}
                      userInfos={userInfos}
                      setUserInfos={setUserInfos}
                      type="comic"
                    />
                  </div>
                );
              })
            ) : (
              <p className="error">You have no favorites</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Favorites;
