import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Item from "../components/Item/Item";
import Pagination from "../components/Pagination/Pagination";

function Characters({
  userInfos,
  setUserInfos,
  modalFavorites,
  setModalFavorites,
}) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  //same limit is on the backend in chracters route
  const limit = 100;

  const pageArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pageArray.push(i);
  }

  const handleFilter = (event) => {
    setSearch(event.target.value);
    setSearching(true);
    setDisplaySuggestions(true);
  };

  const handleSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSearching(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searching) {
          response = await axios.get(
            encodeURI(
              `https://baf-marvel-backend.herokuapp.com/characters?name=${search}`
            )
          );
          setSearching(false);
          setPage(1);
        } else {
          response = await axios.get(
            encodeURI(
              `https://baf-marvel-backend.herokuapp.com/characters?page=${page}&name=${search}`
            )
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

  useEffect(() => {
    const regexp = new RegExp(`${search}`, "i");
    if (data) {
      const tempSuggestions = data.results.filter((item) =>
        regexp.test(item.name.toLowerCase())
      );

      setSuggestions(tempSuggestions);
    }
  }, [search, data]);

  return data ? (
    <main className="main">
      <h1>
        <span className="underline">CHARACTERS</span>
      </h1>
      <div className="filter">
        <div className="filter-wrapper">
          <input
            type="text"
            name="search-characters"
            id="search-characters"
            placeholder="Search for characters"
            value={search}
            onChange={handleFilter}
            onBlur={() => {
              setTimeout(() => {
                setDisplaySuggestions(false);
                setSuggestions([]);
              }, 250);
            }}
            autoComplete="off"
          />
          <div className="autocomplete-wrapper">
            {suggestions.length > 0 && displaySuggestions
              ? suggestions.map((suggestion, index) => {
                  return (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={(e) => {
                        handleSuggestion(suggestion.name);
                      }}
                    >
                      <span>{suggestion.name}</span>
                      <img
                        src={
                          suggestion.thumbnail.path +
                          "." +
                          suggestion.thumbnail.extension
                        }
                        alt={suggestion.name}
                      />{" "}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
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
                to={`/character/${item._id}`}
                className="item"
              >
                <Item
                  data={item}
                  userInfos={userInfos}
                  setUserInfos={setUserInfos}
                  modalFavorites={modalFavorites}
                  setModalFavorites={setModalFavorites}
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
