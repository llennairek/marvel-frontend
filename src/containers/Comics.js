import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../components/Item/Item";
import "./Comics.css";

function Comics() {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searching) {
          response = await axios.get(
            `http://localhost:3001/comics?title=${search}`
          );
          setSearching(false);
          setPage(1);
        } else {
          response = await axios.get(
            `http://localhost:3001/comics?page=${page}&title=${search}`
          );
        }

        setData(response.data);
        setTotalPages(Math.floor(response.data.count / limit) + 1);
        // if (page > Math.floor(response.data.count / limit) + 1) {
        //   setPage(1);
        // }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [page, search]);

  return data ? (
    <main className="main">
      <div className="filter">
        <input
          type="text"
          name="search-comics"
          id="search-comics"
          placeholder="Rechercher des comics"
          value={search}
          onChange={handleFilter}
        />
      </div>
      <div className="container">
        {data.results.map((item) => {
          return (
            <div to={`/personnage/${item._id}`} className="item comics-item">
              <Item key={item._id} data={item} />
            </div>
          );
        })}
      </div>

      {/* pagination */}
      <div className="page-container">
        {page - 1 > 0 ? (
          <button
            onClick={() => {
              setPage(page - 1);
              window.scrollTo(0, 0);
            }}
          >
            previous page
          </button>
        ) : null}

        <span>
          Page {page} on {totalPages}
        </span>
        {page + 1 <= totalPages ? (
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
          >
            next page
          </button>
        ) : null}
      </div>
    </main>
  ) : (
    <div className="loading">En chargement...</div>
  );
}

export default Comics;
