import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Item from "../components/Item/Item";

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
          name="search-characters"
          id="search-characters"
          placeholder="Rechercher des personnages"
          value={search}
          onChange={handleFilter}
        />
      </div>
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
      <div className="page-container">
        {page - 1 > 0 ? (
          <button
            onClick={() => {
              setPage(page - 1);
              window.scrollTo(0, 0);
            }}
          >
            Previous page
          </button>
        ) : null}

        {pageArray.map((item, index) => {
          return (
            <button
              key={index}
              className={index === page - 1 ? "pages current" : "pages"}
              onClick={() => {
                setPage(item);
                window.scrollTo(0, 0);
              }}
            >
              {item}
            </button>
          );
        })}
        {page + 1 <= totalPages ? (
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
          >
            Next page
          </button>
        ) : null}
      </div>
    </main>
  ) : (
    <div className="loading">En chargement...</div>
  );
}

export default Characters;
