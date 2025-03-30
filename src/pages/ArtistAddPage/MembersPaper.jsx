import React, { useState } from "react";
import AddedMemberCards from "./AddedMemberCards";
import ToAddMemeberCard from "./ToAddMemeberCard";

const MembersPaper = ({ group }) => {
  console.log("MembersPaper group:", group);

  const [addedMember, setAddedMember] = useState(group.members);
  const [members, setMembers] = useState([
    {
      artist_name: "aa",
      artist_agency: "",
      group_insta: "",
      artist_group_fandom: "",
      debut_date: "2025-11-11",
      solomembers: "",
      image_url: null,
    },
  ]);

  const addMember = () => {
    setMembers([
      ...members,
      { artist_group: "", instagram: "", image_url: null },
    ]);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="title">멤버정보</div>
          <div className="sub-title">멤버정보를 추가해주세요 🙂</div>
        </div>

        <button className="btn-primary bg-none" onClick={addMember}>
          + 멤버 추가
        </button>
      </div>
      <AddedMemberCards members={group.members} groupId={group.id} />
      {<ToAddMemeberCard group={group} />}

      {/* <div>{JSON.stringify(addedMember)}</div> */}
    </div>
  );
};

export default MembersPaper;
