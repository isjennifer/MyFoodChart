import { useEffect, useRef, useState } from "react";
import CommentLists from "./CommentLists";
import styled from "styled-components"
import { useParams } from "react-router-dom";


export default function WrapComments() {
    const [input, setInput] = useState('')
    const [commentLists, setCommentLists] = useState([])
    const nextID = useRef(1);
    const params = useParams();
    const recipeId = params;
    // 오늘 날짜 간편하게 받아오기 : Moment.js 
    const moment = require('moment');
    
    const addComment = () => {
      if (input !== '') {
        const newComment = {
          id: nextID.current,
          recipeId: recipeId,
          username: 'dundun',
          content: input,
          createdAt: moment().format('YYYY-MM-DD')
        };
        // let newCommentList = [...commentLists]
        // newCommentList.push(newComment);
        setCommentLists([...commentLists,newComment]);
        setInput('');
        nextID.current += 1;
    };
  }

    useEffect(() => {
        fetch(`http://localhost:3010/comments`, {
          method: "POST",
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(commentLists),
        }).then((response) => {
            if (response.ok === true) {
                return response.json();
                }
            throw new Error("에러 발생!");
        }).catch((error) => {
            alert(error);
        });
      },[commentLists])

  console.log(commentLists);



    const editComment = (commentId, editValue) => {
      let newCommentLists = commentLists?.map((item) =>{
        if (item.id===commentId) {
          item.content = editValue;
        }
        return item;
      });

      setCommentLists(newCommentLists);
    }

    

    return (
      <>
        <CommentLists commentLists={commentLists} editComment={editComment} />
        <CommentBox>
          <Input
            type="text"
            placeholder="댓글 달기..."
            value={input||''}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => (e.key === 'Enter' ? addComment() : null)}
            />
          <Button disabled="" onClick={addComment}>
              게시
          </Button>
        </CommentBox>
      </>
    )
  }



  const Button = styled.button`
    display: flex;
    width: 70px;
    height: 30px;
    background-color: #F97F51;
    color: white;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    &:hover{
        cursor: pointer;
    }
    
    
`

  const Input = styled.input`
    border: none; // 검색창 border 을 없앰으로써 자연스러워짐
    -webkit-appearance: none; // 기본 search 디자인을 없앰
    width: 100%;
    height: 40px;
    overflow: auto; //검색어가 길어졌을때 오른쪽으로 자연스럽게 검색되도록 하기 위해
    font-size: 16px;
    margin-left: 10px;
    &:focus{
        outline: none;
    };
`


const CommentBox = styled.div`
    display: inline-flex;
    background-color: white;
    border: #7B7B7B solid 1px;
    padding: 0px 10px;
    border-radius: 40px;
    width: 100%;
    height: 45px;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;


`