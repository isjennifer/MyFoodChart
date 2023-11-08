import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentLists from "./CommentLists";


export default function WrapComments({comments}) {
    const [input, setInput] = useState('')
    const [commentLists, setCommentLists] = useState(comments)
    const params = useParams();
    const {id} = params;
    const date = new Date();


    const addComment = () => {
      if (input !== '') {
        const newComment = {
          id: id,
          username: 'dundun',
          content: input,
          createdAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
        };
        setCommentLists([...commentLists, newComment]);
        setInput('');
      }
    };
    
    const editComment = (commentId, editValue) => {
      let newCommentLists = commentLists?.map((item) =>{
        if (item.id==commentId) {
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
            value={input}
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