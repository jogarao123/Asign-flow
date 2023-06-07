import {Comment} from "../../types/types.ts";
import {useFetchCommentsByAssignmentId} from "../../hooks/useFetchComments.ts";
import {useEffect, useState} from "react";
import CommentBox from "./CommentBox.tsx";
import CommentView from "./CommentView.tsx";

interface CommentsViewProps {
   assignmentId: any,
}

function CommentsView({assignmentId}: CommentsViewProps) {
   const {data: fetchedComments} = useFetchCommentsByAssignmentId(assignmentId);
   const [comments, setComments] = useState<Comment[]>(fetchedComments);
   const [currentComment, setCurrentComment] = useState<any>(null);
   useEffect(() => {
      setComments(fetchedComments)
   }, [fetchedComments])

   useEffect(()=>{
      console.log('comments is ',comments)
   },[comments])
   return <>
      <div className="mt-5">
         <CommentBox
            assignmentId={assignmentId}
            currentComment={currentComment}
            setCurrentComment={setCurrentComment}
            setComments={setComments}
         />
      </div>
      <div className="mt-5">
         {
            comments &&
            comments.map((comment: Comment) => {
               return <div key={comment.id}>
                  <CommentView comment={comment}
                               currentComment={currentComment}
                               setCurrentComment={setCurrentComment}
                               setComments={setComments}
                  />
               </div>
            })
         }
      </div>
   </>
}

export default CommentsView;