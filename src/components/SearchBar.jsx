import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
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
        style={{ flex: 1, padding: "8px 40px 8px 8px", outline: "none" }}
      />
      <FaSearch style={{ position: "absolute", right: "10px" }} />
    </div>
  );
};

export default SearchBar;
