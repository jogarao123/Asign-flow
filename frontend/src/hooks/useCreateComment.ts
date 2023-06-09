import {useMutation, useQueryClient} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {Comment, CommentRequestType} from "../types/types.ts";
import {createComment} from "../util/api.ts";

export const useCreateComment = () => {
   const queryClient = useQueryClient();
   const [jwt] = useLocalStorage('jwt', '');
   return useMutation(async (comment: CommentRequestType) => {
         return await createComment(comment, jwt)
      }
      , {
         onSuccess: (comment: Comment) => {
            queryClient.invalidateQueries(['comments', comment.assignment.id])
         }
      })

}