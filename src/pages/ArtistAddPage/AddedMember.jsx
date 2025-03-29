import React from "react";
import useArtistGroups from "../../api/artist/useArtistGroups";

const AddedMember = (addedMember) => {
  const { deleteMember } = useArtistGroups();
  const [deleted, setDeleted] = React.useState(false);
  const groupid = addedMember.addedMember.id;
  console.log(addedMember.addedMember.members);
  console.log("groupid:", groupid);

  React.useEffect(() => {
    if (deleted) {
      setDeleted(false);
    }
  }, [deleted]);

  const handleDeleteMember = (memberid) => {
    deleteMember(groupid, memberid);
    setDeleted(true);
  };

  return (
    <div>
      {addedMember.addedMember.members.map((member, index) => (
        <div
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <p>이름: {member.artist_name}</p>
            <p>인스타: {member.instagram}</p>

            <button onClick={() => handleDeleteMember(member.id)}>
              x삭제하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddedMember;
