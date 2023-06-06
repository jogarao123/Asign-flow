import {useQuery} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {fetchCommentsByAssignmentId} from "../util/api.ts";

export const useFetchCommentsByAssignmentId = (assignmentId?: any) => {
   const [jwt] = useLocalStorage('jwt', '');
   return useQuery(['comments', assignmentId], async () => {
         return await fetchCommentsByAssignmentId(assignmentId, jwt);
      }
   );
};