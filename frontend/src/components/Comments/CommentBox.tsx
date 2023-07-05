import {Button} from "react-bootstrap";
import * as React from "react";
import {useEffect, useState} from "react";
import {useCreateComment} from "../../hooks/useCreateComment.ts";
import {Comment} from "../../types/types.ts";
import {useUpdateComment} from "../../hooks/useUpdateComment.ts";
import {useFetchCommentsByAssignmentId} from "../../hooks/useFetchComments.ts";
import {useQueryClient} from "react-query";

interface CommentBoxProps {
   assignmentId: any,
   currentComment: Comment,
   setCurrentComment: any,
   setComments: any
}

function CommentBox({assignmentId, currentComment, setCurrentComment, setComments}: CommentBoxProps) {
   const {data, refetch} = useFetchCommentsByAssignmentId(assignmentId);
   const queryClient = useQueryClient();

   const [text, setText] = useState<string>('');
   const {mutateAsync: createComment} = useCreateComment();
   const {mutateAsync: updateComment} = useUpdateComment();


   useEffect(() => {
      if (currentComment)
         setText(currentComment.text);
      else setText('')
   }, [currentComment])
   const handlePost = async () => {
      if (assignmentId) {
         if (currentComment) {
            await updateComment({id: currentComment.id, text, assignmentId});
         } else
            await createComment({assignmentId: parseInt(assignmentId), text});
         queryClient.invalidateQueries(['comments', assignmentId])
         setCurrentComment(null);
      }
      await refetch();

      setComments(data)
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