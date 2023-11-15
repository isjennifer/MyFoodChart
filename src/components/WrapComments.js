import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CommentLists from "./CommentLists";


export default function WrapComments() {
    const [input, setInput] = useState('')
    const [commentLists, setCommentLists] = useState([])

    // const params = useParams();
    // const {id} = params;
    const nextID = useRef(1);
    const date = new Date();

    // useEffect(() => {
    //   setCommentLists()
    // }, [commentLists]);

    const addComment = () => {
      if (input !== '') {
        const newComment = {
          id: nextID.current,
          username: 'dundun',
          content: input,
          createdAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
        };
        let newCommentList = [...commentLists]
        console.log(newCommentList);
        newCommentList.push(newComment);
        console.log(newCommentList);
        setCommentLists(newCommentList);
        setInput('');
        nextID.current += 1; 
      }
    };
    

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
        <div>
          <input
            type="text"
            placeholder="댓글 달기..."
            value={input||''}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => (e.key === 'Enter' ? addComment() : null)}
            />
          <button disabled="" onClick={addComment}>
              게시
          </button>
        </div>
      </>
    )
  }