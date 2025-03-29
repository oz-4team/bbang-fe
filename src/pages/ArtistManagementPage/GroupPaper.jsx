import React from "react";
import useArtist from "../../api/artist/useArtist";

const GroupPaper = ({ group }) => {
  const { deleteArtist } = useArtist();

  const handleDeleteGroup = (groupId) => {
    deleteArtist(groupId)
      .then(() => {
        // Handle successful deletion, e.g., update state or show a message
        console.log(`Group with ID ${groupId} deleted successfully.`);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting group with ID ${groupId}:`, error);
      });
  };
  return (
    <>
      <div className="group-paper">
        <h2>Group List</h2>

        <div key={group.id} className="group-item">
          <h3>{group.name}</h3>
          <p>내용</p>
        </div>
      </div>
      <button
        onClick={() => {
          handleDeleteGroup(group.id);
        }}
      >
        Delete Group
      </button>
      <style jsx>{`
        .group-paper {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .group-item {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default GroupPaper;
