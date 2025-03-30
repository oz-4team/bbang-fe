import React from "react";
import AddedMemberCards from "./AddedMemberCards";

const MembersPaper = ({ members }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="title">멤버정보</div>
          <div className="sub-title">멤버정보를 추가해주세요 🙂</div>
        </div>
      </div>
      <AddedMemberCards members={members} />
    </div>
  );
};

export default MembersPaper;
