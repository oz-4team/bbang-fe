import React from "react";

const ScheduleHashtagInput = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [hashtags, setHashtags] = React.useState([]);

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        setHashtags([...hashtags, `#${inputValue.trim()}`]);
        setInputValue("");
      }
    }
  };

  const handleRemoveHashtag = (indexToRemove) => {
    setHashtags(hashtags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.includes("#")) {
      setInputValue(value.replace(/#/g, ""));
    } else {
      setInputValue(value);
    }
  };

  return (
    <div>
      <div>
        {hashtags.map((hashtag, index) => (
          <span key={index}>
            {hashtag}
            <button
              style={{ background: "none" }}
              onClick={() => handleRemoveHashtag(index)}
            >
              x
            </button>
          </span>
        ))}
      </div>
      {/* 한글 입력시 중복되는 이슈 해결해야함 */}
      <input
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginTop: "8px",
          width: "100%",
          display: "block",
        }}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionUpdate={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        placeholder="해시태그를 입력하세요 (한글 입력시 중복되는 이슈 해결해야함"
      />
    </div>
  );
};

export default ScheduleHashtagInput;
