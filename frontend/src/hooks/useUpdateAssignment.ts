import {useMutation, useQueryClient} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {Assignment} from "../types/types.ts";
import {updateAssignment} from "../util/api.ts";

export const useUpdateAssignment = () => {
   const queryClient = useQueryClient();
   const [jwt] = useLocalStorage('jwt', '');

   return useMutation(async (updatedAssignment:Assignment) =>{
      return await updateAssignment(updatedAssignment.id, updatedAssignment, jwt);
   }, {
      onSuccess: (updatedAssignment:Assignment) => {
         // Trigger refetch of assignments query after update operation
         queryClient.invalidateQueries(['assignment', 'all']);
         queryClient.invalidateQueries(['assignment',updatedAssignment.id])
      },
   });
}
