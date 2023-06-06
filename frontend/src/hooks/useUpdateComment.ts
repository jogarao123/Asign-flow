import {useMutation, useQueryClient} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {Comment, CommentRequestType} from "../types/types.ts";
import {updateComment} from "../util/api.ts";

export const useUpdateComment = () => {
   const queryClient = useQueryClient();
   const [jwt] = useLocalStorage('jwt', '');

   return useMutation(async (comment: CommentRequestType) => {
      return await updateComment(comment, jwt);
   }, {
      onSuccess: (updatedComment: Comment) => {
         // Trigger refetch of assignments query after update operation
         queryClient.invalidateQueries(['comments', updatedComment.assignment.id]);
      },
   });
}
