import React from "react";
import "./Item.css";

function Item({ data }) {
  return (
    <div className="item-wrapper">
      <div className="title-wrapper">
        <h2 className="item-title">{data.name ? data.name : data.title}</h2>
      </div>
      <div className="img-wrapper">
        <img
          src={data.thumbnail.path + "." + data.thumbnail.extension}
          alt={data.name}
          // added style to see the text image not found on the default image
          style={
            data.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
              ? { objectPosition: "bottom" }
              : null
          }
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
