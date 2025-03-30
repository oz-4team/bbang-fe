import React from "react";
import AddedMemberCards from "./AddedMemberCards";
import ToAddMemeberCard from "./ToAddMemeberCard";

const AddMemberButton = ({ onClick, mode }) => {
  return (
    <button
      className="add-button"
      onClick={onClick}
      style={{
        backgroundColor: mode ? "#f0f0f0" : "#ffffff",
        color: mode ? "#555555" : "#888888",
      }}
    >
      {mode ? "+ 멤버 추가하기" : "멤버 추가 종료"}
    </button>
  );
};

const MembersPaper = ({ group }) => {
  const [addMode, setAddMode] = React.useState(false);
  const [members] = React.useState(group.members);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="title">멤버정보</div>
          <div className="sub-title">멤버정보를 추가해주세요 🙂</div>
        </div>
        <AddMemberButton onClick={() => setAddMode(!addMode)} mode={addMode} />
      </div>
      <AddedMemberCards members={members} />
      <ToAddMemeberCard group={group} />
    </div>
  );
};

export default MembersPaper;
