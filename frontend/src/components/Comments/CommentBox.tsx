import {Button} from "react-bootstrap";
import * as React from "react";
import {useEffect, useState} from "react";
import {useCreateComment} from "../../hooks/useCreateComment.ts";
import {Comment} from "../../types/types.ts";
import {useUpdateComment} from "../../hooks/useUpdateComment.ts";

interface CommentBoxProps {
   assignmentId: any,
   currentComment: Comment,
   setCurrentComment: any
}

function CommentBox({assignmentId, currentComment, setCurrentComment}: CommentBoxProps) {
   const [text, setText] = useState<string>('');
   const createComment = useCreateComment();
   const updateComment = useUpdateComment();

   useEffect(() => {
      if (currentComment)
         setText(currentComment.text);
      else setText('')
   }, [currentComment])
   const handlePost = async () => {
      if (assignmentId) {
         if (currentComment) {
            updateComment.mutate({id: currentComment.id, text, assignmentId});
         } else
            createComment.mutate({assignmentId: parseInt(assignmentId), text});
         setCurrentComment(null);
      }
   }
   const handleClear = () => {
      setCurrentComment(null);
      setText('')
   }

   return <>
         <textarea
            style={{width: "90%", borderRadius: "0.25em"}}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
         />
      <Button onClick={handlePost}>
         {
            currentComment ? <>Edit Comment</> : <>Post Comment</>
         }
      </Button>
      <Button onClick={handleClear}>Clear</Button>

   </>
}

export default CommentBox;