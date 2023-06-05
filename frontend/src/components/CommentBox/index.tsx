import {Button} from "react-bootstrap";
import * as React from "react";
import {useState} from "react";
import {useCreateComment} from "../../hooks/useCreateComment.ts";

function CommentBox({assignmentId}: { assignmentId: number|null  }) {
   const [text, setText] = useState<string>('');
   const createComment = useCreateComment();
   const handlePost = () => {
      if(assignmentId)
         createComment.mutate({assignmentId: assignmentId, text});
   }
   return <>
         <textarea
            style={{width: "90%", borderRadius: "0.25em"}}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
         />
      <Button onClick={handlePost}>Post Comment</Button>
   </>
}

export default CommentBox;