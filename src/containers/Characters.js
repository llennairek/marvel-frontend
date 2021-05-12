import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Characters() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState("");

  //same limit is on the backend in chracters route
  const limit = 100;

  const pageArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(i);
  }

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/characters?page=${page}&name=${search}`
        );
        setData(response.data);
        setTotalPages(Math.floor(response.data.count / limit) + 1);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [page, search]);

  return data ? (
    <main className="characters-main">
      <div className="characters-filter">
        <input
          type="text"
          name="search-characters"
          id="search-characters"
          value={search}
          onChange={handleFilter}
        />
      </div>
      <div className="characters-container">
        {data.results.map((item) => {
          return (
            <Link to={`/personnage/${item._id}`}>
              <div
                key={item._id}
                className="characters-item"
                onClick={handleClick}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      {/* pagination */}
      <div className="page-container">
        {page - 1 > 0 ? (
          <button onClick={() => setPage(page - 1)}>previous page</button>
        ) : null}

        {pageArray.map((item, index) => {
          return (
            <button key={index} className="pages" onClick={() => setPage(item)}>
              {item}
            </button>
          );
        })}
        {page + 1 <= totalPages ? (
          <button onClick={() => setPage(page + 1)}>next page</button>
        ) : null}
      </div>
    </main>
  ) : (
    <div>En chargement</div>
  );
}

export default Characters;
