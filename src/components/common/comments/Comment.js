import { useState } from "react";
import styled from "styled-components";

export default function Comment({
  comment: { id, user, content, createdAt },
  isEditing,
  setSelectedCommentIndex,
  editComment,
}) {
  const [editValue, seteEditValue] = useState(content);
  const moment = require("moment");
  const handleEditInput = () => {
    editComment(id, editValue);
    setSelectedCommentIndex(0);
  };
  const editInput = (
    <input
      type="text"
      value={editValue || ""}
      onChange={(e) => seteEditValue(e.target.value)}
      onKeyDown={(e) => (e.key === "Enter" ? handleEditInput() : null)}
    />
  );

  return (
    <li>
      <CommentGrid>
        <CommentItem>{user.nickname}</CommentItem>
        {isEditing ? editInput : <CommentItem>{content}</CommentItem>}
        <CommentItem>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</CommentItem>
        <Button onClick={isEditing ? () => handleEditInput() : () => setSelectedCommentIndex(id)}>
          수정
        </Button>
      </CommentGrid>
    </li>
  );
}

const Button = styled.button`
  display: flex;
  width: 60px;
  height: 30px;
  background-color: #f97f51;
  color: white;
  border: none;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;
  margin-bottom: 10px;
  /* border: solid 2px black; */
  &:nth-child(1) {
    font-size: 16px;
  }
  &:nth-child(3) {
    font-size: 16px;
  }
`;

const CommentGrid = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 3fr 1fr 0.5fr;
  gap: 10px;
`;
