import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    onRemove(id);
  };

  const handleQuitEdit = () => {
    toggleIsEdit();
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      alert("5글자 이상 입력해주세요.");
      localContentInput.current.focus();
      return;
    }
    toggleIsEdit();
    onEdit(id, localContent);
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            value={localContent}
            onChange={(e) => {
              setLocalContent(e.target.value);
            }}
            ref={localContentInput}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleEdit}>저장하기</button>
          <button onClick={handleQuitEdit}>취소하기</button>
        </>
      ) : (
        <>
          <button onClick={toggleIsEdit}>수정하기</button>
          <button onClick={handleRemove}>삭제하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
