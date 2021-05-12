import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item/Item";
import defaultImage from "../assets/default-image.jpg";
import "./Character.css";

function Character() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/comics/${id}`);
      setData(response.data);
    };

    fetchData();
  }, [id]);

  return data ? (
    <main className="main-character">
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
        <h1>{data.name}</h1>
        <p>
          {data.description ? data.description : "No description available"}
        </p>
        <div className="comics-wrapper">
          {data.comics.map((item) => {
            return (
              <div className="item">
                <Item key={item._id} data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  ) : (
    <div>En chargement</div>
  );
}

export default Character;
