import React from "react";
import { FaCheck } from "react-icons/fa6";
import styled from "styled-components";

const CategoryChip = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;
  /* border: 1px solid #ccc; */
  border-radius: 15px;
  margin-top: 1rem;
  margin-right: 1rem;

  background-color: #f5f5f5;
`;

const ScheduleCategoryInput = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {["방송", "구매", "이벤트", "릴리즈", "기타", "비공개"].map(
        (category) => (
          <CategoryChip
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundColor:
                selectedCategory === category ? "#4a90e2" : "#f5f5f5",
              color: selectedCategory === category ? "#fff" : "#000",
            }}
          >
            {category}
            {selectedCategory === category && (
              <FaCheck
                style={{
                  marginLeft: "0.5rem",
                  display: "inline",
                }}
              />
            )}
          </CategoryChip>
        )
      )}
    </div>
  );
};

export default ScheduleCategoryInput;
