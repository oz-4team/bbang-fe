import React from "react";

const SearchBar = () => {
  return (
    <div style={{ minWidth: "300px", display: "flex", alignItems: "center" }}>
      <input type="text" placeholder="아티스트 검색" style={{ flex: 1 }} />
    </div>
  );
};

export default SearchBar;
