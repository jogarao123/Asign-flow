import {useQuery} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {fetchAssignmentById, fetchAssignments} from "../util/api.ts";

export const useFetchAssignments = (id?: string) => {
   const [jwt] = useLocalStorage('jwt', '');
   return useQuery(['assignment', id || 'all'], async () =>{
      if(id)
         return await fetchAssignmentById(id,jwt)
      else
         return await fetchAssignments(jwt)
   }
   );
};