import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemFlip from "../components/Item/ItemFlip";
import defaultImage from "../assets/default-image.jpg";
import "./Character.css";

function Character({
  userInfos,
  setUserInfos,
  modalFavorites,
  setModalFavorites,
}) {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://baf-marvel-backend.herokuapp.com/comics/${id}`
      );
      setData(response.data);
    };

    fetchData();
  }, [id]);

  return data ? (
    <main className="main-character">
      <h1>{data.name}</h1>
      <div className="main-chracter-wrapper">
        <div className="character-img-wrapper">
          <img
            src={
              data.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                ? defaultImage
                : data.thumbnail.path + "." + data.thumbnail.extension
            }
            alt=""
          />
        </div>
        <div className="character-infos-wrapper">
          <p>
            {data.description ? data.description : "No description available"}
          </p>
          <div className="comics-wrapper">
            {data.comics.map((item) => {
              return (
                <div key={item._id} className="comics-item">
                  <ItemFlip
                    data={item}
                    userInfos={userInfos}
                    setUserInfos={setUserInfos}
                    modalFavorites={modalFavorites}
                    setModalFavorites={setModalFavorites}
                    type="comic"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  ) : (
    <div>En chargement</div>
  );
}

export default Character;
