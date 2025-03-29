import React from "react";

const ArtistPaper = ({ artist }) => {
  return (
    <>
      <div className="artist-paper">
        <h2>Artist List</h2>
        {/* {artists.map((artist) => ( */}
        <div key={artist.id} className="artist-item">
          <h3>{artist.artist_name}</h3>
          <p>내용</p>
        </div>
        {/* ))} */}
      </div>
      <style jsx>{`
        .artist-paper {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .artist-item {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default ArtistPaper;
