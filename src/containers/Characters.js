import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Item from "../components/Item/Item";
import Pagination from "../components/Pagination/Pagination";

function Characters({ userInfos, setUserInfos }) {
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
      <h1>
        <span className="underline">CHARACTERS</span>
      </h1>
      {/* <p className="subtitle">
        You can add a character to your favorites by clicking the star
        <br />
        Click a card to have more info about the character
      </p> */}
      <div className="filter">
        <input
          type="text"
          name="search-characters"
          id="search-characters"
          placeholder="Search for characters"
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
        {data.count > 0 ? (
          data.results.map((item) => {
            return (
              <Link
                key={item._id}
                to={`/personnage/${item._id}`}
                className="item"
              >
                <Item
                  data={item}
                  userInfos={userInfos}
                  setUserInfos={setUserInfos}
                />
              </Link>
            );
          })
        ) : (
          <p className="no-results">No results</p>
        )}
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
