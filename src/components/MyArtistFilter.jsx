import React from "react";

const MyArtistFilter = () => {
  return (
    <div style={{ minWidth: "300px" }}>
      <select>
        <option value="all">마이 아티스트</option>
        <option value="artist1">Artist 1</option>
        <option value="artist2">Artist 2</option>
        <option value="artist3">Artist 3</option>
      </select>
    </div>
  );
};

export default MyArtistFilter;
