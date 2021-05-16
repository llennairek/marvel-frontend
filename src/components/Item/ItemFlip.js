import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/default-image.jpg";
import "./ItemFlip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function ItemFlip({
  data,
  userInfos,
  setUserInfos,
  type,
  modalFavorites,
  setModalFavorites,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async (event) => {
    event.preventDefault();

    if (Object.keys(userInfos).length > 0) {
      if (isFavorite) {
        const tempUser = { ...userInfos };
        if (type === "comic") {
          const testArray = userInfos.favorites.comics.map((item) => {
            return item._id;
          });
          tempUser.favorites.comics.splice(testArray.indexOf(data._id), 1);
        } else {
          const testArray = userInfos.favorites.characters.map((item) => {
            return item._id;
          });
          tempUser.favorites.characters.splice(testArray.indexOf(data._id), 1);
        }

        setUserInfos(tempUser);
        setIsFavorite(!isFavorite);
        try {
          await axios.put(`http://localhost:3001/user/${userInfos._id}`, {
            favorites: tempUser.favorites,
          });
        } catch (error) {
          console.error({ error: error.message });
        }
      } else {
        const tempUser = { ...userInfos };
        if (type === "comic") {
          tempUser.favorites.comics.push(data);
        } else {
          tempUser.favorites.characters.push(data);
        }

        setUserInfos(tempUser);
        setIsFavorite(!isFavorite);
        try {
          await axios.put(`http://localhost:3001/user/${userInfos._id}`, {
            favorites: tempUser.favorites,
          });
        } catch (error) {
          console.error({ error: error.message });
        }
      }
    } else {
      setModalFavorites(true);
    }
  };

  useEffect(() => {
    if (userInfos && Object.keys(userInfos).length > 0) {
      let testArray;
      if (type === "comic") {
        testArray = userInfos.favorites.comics.map((item) => {
          return item._id;
        });
      } else {
        testArray = userInfos.favorites.characters.map((item) => {
          return item._id;
        });
      }

      if (testArray.indexOf(data._id) !== -1) {
        setIsFavorite(true);
      }
    }
  }, []);

  return (
    <div className="item-flip-wrapper">
      <div className="card front">
        {isFavorite ? (
          <FontAwesomeIcon
            icon={["fas", "star"]}
            className="fas-star"
            onClick={handleFavorite}
          />
        ) : (
          <FontAwesomeIcon
            icon={["far", "star"]}
            className="far-star"
            onClick={handleFavorite}
          />
        )}
        <h3 className="item-flip-title">
          {data.name ? data.name : data.title}
        </h3>
        <div className="img-flip-wrapper">
          <img
            src={
              data.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                ? defaultImage
                : data.thumbnail.path + "." + data.thumbnail.extension
            }
            alt={data.name}
          />
        </div>
      </div>

      {/* </div> */}
      <div className="card back">
        {isFavorite ? (
          <FontAwesomeIcon
            icon={["fas", "star"]}
            className="fas-star"
            onClick={handleFavorite}
          />
        ) : (
          <FontAwesomeIcon
            icon={["far", "star"]}
            className="far-star"
            onClick={handleFavorite}
          />
        )}
        <div className="description-flip-wrapper">
          <p className="description-flip">
            {data.description ? data.description : "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemFlip;
