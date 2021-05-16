import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/default-image.jpg";
import "./Item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Item({ data, userInfos, setUserInfos }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async (event) => {
    event.preventDefault();

    if (Object.keys(userInfos).length > 0) {
      if (isFavorite) {
        const tempUser = { ...userInfos };
        const testArray = userInfos.favorites.characters.map((item) => {
          return item._id;
        });
        tempUser.favorites.characters.splice(testArray.indexOf(data._id), 1);
        setUserInfos(tempUser);
        setIsFavorite(!isFavorite);
        try {
          await axios.put(
            `https://baf-marvel-backend.herokuapp.com/user/${userInfos._id}`,
            {
              favorites: tempUser.favorites,
            }
          );
        } catch (error) {
          console.error({ error: error.message });
        }
      } else {
        const tempUser = { ...userInfos };
        tempUser.favorites.characters.push(data);
        setUserInfos(tempUser);
        setIsFavorite(!isFavorite);
        try {
          await axios.put(
            `https://baf-marvel-backend.herokuapp.com/user/${userInfos._id}`,
            {
              favorites: tempUser.favorites,
            }
          );
        } catch (error) {
          console.error({ error: error.message });
        }
      }
    } else {
      alert("You have to be logged in to add favorites");
    }
  };

  useEffect(() => {
    if (Object.keys(userInfos).length > 0) {
      const testArray = userInfos.favorites.characters.map((item) => {
        return item._id;
      });
      if (testArray.indexOf(data._id) !== -1) {
        setIsFavorite(true);
      }
    }
  }, []);

  return (
    <div className="item-wrapper">
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

      <div className="title-wrapper">
        <h2 className="item-title">{data.name ? data.name : data.title}</h2>
      </div>
      <div className="img-wrapper">
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
      <div className="description-wrapper">
        <p className="description">
          {data.description ? data.description : "No description available"}
        </p>
      </div>
    </div>
  );
}

export default Item;
