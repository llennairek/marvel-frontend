import React from "react";
import defaultImage from "../../assets/default-image.jpg";
import "./Item.css";

function Item({ data }) {
  return (
    <div className="item-wrapper">
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
