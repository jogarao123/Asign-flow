import {Comment, DecodedToken} from "../../types/types.ts";
import {useLocalStorage} from "../../util/useLocalStorage.ts";
import jwt_decode from "jwt-decode";
import {useDeleteComment} from "../../hooks/useDeleteComment.ts";
import {useQueryClient} from "react-query";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface CommentProps {
   comment: Comment,
   currentComment: Comment,
   setCurrentComment: any,
   refetchComments:any
}

function CommentView({comment, setCurrentComment,refetchComments}: CommentProps) {
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
      refetchComments();
   }


   return <>
      <div className="comment-bubble">
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
      <div style={{
         marginTop: "-1.25em",
         marginLeft: "1.4em",
         fontSize: "12px"
      }}>{dayjs(comment.createdDate).fromNow()}</div>


   </>

}

export default CommentView;