import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <img src={data.thumbnail.path + "." + data.thumbnail.extension} alt="" />
    </div>
  ) : (
    <div>En chargement</div>
  );
}

export default Character;
