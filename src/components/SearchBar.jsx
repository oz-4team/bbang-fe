import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        minWidth: "300px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="아티스트 검색"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          flex: 1,
          padding: "8px 40px 8px 8px",
          outline: "none",
          height: "60px",
          borderRadius: "8px",
        }}
      />
      <FaSearch
        onClick={handleSearch}
        style={{
          position: "absolute",
          right: "10px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default SearchBar;
