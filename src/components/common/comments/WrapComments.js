import { useEffect, useRef, useState } from "react";
import CommentLists from "./CommentLists";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserInfo } from "../../../contexts/UserInfoContext";

export default function WrapComments() {
  const {userInfo} = useUserInfo();

  const [input, setInput] = useState("");
  const [commentLists, setCommentLists] = useState([]);
  const nextID = useRef(1);
  const dateNow = new Date();
  const params = useParams();
  const recipeId = params;
  // 오늘 날짜 간편하게 받아오기 : Moment.js
  const moment = require("moment");

  const addComment = () => {
    // 댓글 리스트 생성
    if (input !== "") {
      const newComment = {
        username: userInfo.nickname,
        commentedAt: recipeId.id,
        content: input,
        createdAt: moment().format("YYYY-MM-DD"),
      };
      setCommentLists([...commentLists, newComment]);
      setInput("");
      nextID.current += 1;
      console.log(nextID.current);
      // 댓글 서버 보내기
      fetch(`${process.env.REACT_APP_DOMAIN}/comments/diet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
        .then((response) => {
          if (response.ok === true) {
            return response.json();
          }
          throw new Error("에러 발생!");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN}/comments/diet`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setCommentLists(data));
  }, []);

  const editComment = (commentId, editValue) => {
    console.log(commentId);

    let newCommentLists = commentLists?.map((comment) => {
      if (comment.id === commentId) {
        comment.content = editValue;
        console.log(comment.id);
      }
      return comment;
    });
    setCommentLists(newCommentLists);

    const updateComment = newCommentLists.find(
      (comment) => comment.id === commentId
    );
    console.log(updateComment);
    // 댓글 서버에 업데이트
    fetch(`${process.env.REACT_APP_DOMAIN}/comments/diet/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateComment),
    })
      .then((response) => {
        console.log(response);
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러 발생!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <CommentLists commentLists={commentLists} editComment={editComment} />
      <CommentBox>
        <Input
          type="text"
          placeholder="댓글 달기..."
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && e.nativeEvent.isComposing === false
              ? addComment()
              : null
          }
        />
        <Button disabled="" onClick={addComment}>
          게시
        </Button>
      </CommentBox>
    </>
  );
}

const Button = styled.button`
  display: flex;
  width: 70px;
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

const Input = styled.input`
  border: none; // 검색창 border 을 없앰으로써 자연스러워짐
  -webkit-appearance: none; // 기본 search 디자인을 없앰
  width: 100%;
  height: 40px;
  overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
  font-size: 16px;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const CommentBox = styled.div`
  display: inline-flex;
  background-color: white;
  border: #7b7b7b solid 1px;
  padding: 0px 10px;
  border-radius: 40px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
