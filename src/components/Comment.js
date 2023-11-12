import { useState } from "react";



export default function Comment({
    comment: {id, username, content, createdAt},
    isEditing,
    setSelectedCommentIndex,
    editComment,
}) {
    const [editValue, seteEditValue] = useState(content);

    const handleEditInput = () => {
        editComment(id, editValue);
        setSelectedCommentIndex(0);
    }

    const editInput = (
        <input
            type="text"
            value={editValue}
            onChange={e=>seteEditValue(e.target.value)}
            onKeyDown={e=>(e.key==="Enter"? handleEditInput():null)}
        />
    )

    return(
        <li>
            <span>
                <span>{username}</span>
                {isEditing? editInput : <span>{content}</span>}
            </span>
            <span>{createdAt}</span>
            <button onClick={isEditing? handleEditInput() : setSelectedCommentIndex(id)}>
                수정
            </button>
        </li>
    )

}
