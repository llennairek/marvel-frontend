import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Item from "../components/Item/Item";
import Pagination from "../components/Pagination/Pagination";

function Characters() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  //same limit is on the backend in chracters route
  const limit = 100;

  const pageArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(i);
  }

  const handleFilter = (event) => {
    setSearch(event.target.value);
    setSearching(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searching) {
          response = await axios.get(
            `http://localhost:3001/characters?name=${search}`
          );
          setSearching(false);
          setPage(1);
        } else {
          response = await axios.get(
            `http://localhost:3001/characters?page=${page}&name=${search}`
          );
        }
        setData(response.data);
        setTotalPages(Math.floor(response.data.count / limit) + 1);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [page, search, searching]);

  return data ? (
    <main className="main">
      <div className="filter">
        <input
          type="text"
          name="search-characters"
          id="search-characters"
          placeholder="Rechercher des personnages"
          value={search}
          onChange={handleFilter}
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageArray={pageArray}
      />
      <div className="container">
        {data.results.map((item) => {
          return (
            <Link to={`/personnage/${item._id}`} className="item">
              <Item key={item._id} data={item} />
            </Link>
          );
        })}
      </div>

      {/* pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        pageArray={pageArray}
      />
    </main>
  ) : (
    <div className="loading">En chargement...</div>
  );
}

export default Characters;
