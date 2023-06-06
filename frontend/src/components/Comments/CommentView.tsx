import {Comment, DecodedToken} from "../../types/types.ts";
import {useLocalStorage} from "../../util/useLocalStorage.ts";
import jwt_decode from "jwt-decode";
import {useDeleteComment} from "../../hooks/useDeleteComment.ts";
import {useQueryClient} from "react-query";

interface CommentProps {
   comment: Comment,
   currentComment: Comment,
   setCurrentComment: any
}

function CommentView({comment, setCurrentComment}: CommentProps) {
   const [token] = useLocalStorage('jwt', '');
   const {mutateAsync: deleteComment} = useDeleteComment();
   const queryClient = useQueryClient();

   function getUserIdFromJwt() {
      const json: DecodedToken = jwt_decode(token);
      return json.sub;
   }

   const handleDelete = async () => {
      await deleteComment(comment.id);
      queryClient.invalidateQueries(['comments', comment.assignment.id])
   }


   return <div className="comment-bubble">
      <div className="d-flex gap-5" style={{fontWeight: "bold"}}>
         <div>{comment.createdBy.name}</div>
         {
            (getUserIdFromJwt() === comment.createdBy.username) &&
             <>
                 <div style={{cursor: "pointer", color: "blue"}}
                      onClick={() => setCurrentComment(comment)}
                 >edit
                 </div>
                 <div style={{cursor: "pointer", color: "red"}}
                      onClick={handleDelete}
                 >delete
                 </div>
             </>
         }
      </div>
      <div>
         {comment.text}
      </div>
   </div>

}

export default CommentView;