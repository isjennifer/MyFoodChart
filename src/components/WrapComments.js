import { useState } from "react";
import { useParams } from "react-router-dom";


export default function WrapComments() {
    const [input, setInput] = useState('')
    const [commentLists, setCommentLists] = useState(data)
    const params = useParams();
    const {id} = params;
    const date = new Date();
    console.log(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + date.getTime())

    const addComment = () => {
      if (input !== '') {
        const newComment = {
          id: id,
          username: 'dundun',
          content: input,
          createdAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + date.getTime()
        };
        setCommentLists([...commentLists, newComment]);
        setInput('');
      }
    };
    
    return (
      <>
        <ul>
          {commentLists.map(comment => {
            const commentId = comment.id;
            return (
              <Comment
                key={createdAt}
                comment={comment}
              />
            );
          })}
        </ul>
            
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