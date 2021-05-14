import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemFlip from "../components/Item/ItemFlip";
import Pagination from "../components/Pagination/Pagination";
import "./Comics.css";

function Comics({ userInfos, setUserInfos }) {
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
  }, [page, search, searching]);

  return data ? (
    <main className="main">
      <h1>
        <span className="underline">COMICS</span>
      </h1>
      {/* <p className="subtitle">
        You can add a comic to your favorites by clicking the star
        <br />
        Hover a card to have more info about the comic
      </p> */}
      <div className="filter">
        <input
          type="text"
          name="search-comics"
          id="search-comics"
          placeholder="Search for comics"
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
              <div key={item._id} className="comics-item">
                <ItemFlip
                  data={item}
                  userInfos={userInfos}
                  setUserInfos={setUserInfos}
                  type="comic"
                />
              </div>
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

export default Comics;
