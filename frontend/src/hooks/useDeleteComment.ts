import {useMutation} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {deleteComment} from "../util/api.ts";

export const useDeleteComment = () => {
   const [jwt] = useLocalStorage('jwt', '');
   return useMutation(async (commentId:number) => {
         return await deleteComment(commentId,jwt)
      })
}