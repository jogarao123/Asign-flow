import {useMutation, useQueryClient} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {Assignment} from "../types/types.ts";
import {updateAssignment} from "../util/api.ts";

export const useUpdateAssignment = (id:any) => {
   const queryClient = useQueryClient();
   const [jwt] = useLocalStorage('jwt', '');

   return useMutation(async (updatedAssignment:Assignment) =>{
      return await updateAssignment(id, updatedAssignment, jwt);
   }, {
      onSuccess: () => {
         // Trigger refetch of assignments query after update operation
         queryClient.invalidateQueries(['assignment', 'all']);
         queryClient.invalidateQueries(['assignment',id])
      },
   });
}
