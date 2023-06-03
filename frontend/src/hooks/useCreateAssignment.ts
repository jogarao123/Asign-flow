import {useMutation, useQueryClient} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {Assignment} from "../types/types.ts";
import {createAssignment} from "../util/api.ts";

export const useCreateAssignment=()=>{
   const queryClient=useQueryClient();
   const [jwt]=useLocalStorage('jwt','');
   return useMutation(async (assignment:Assignment|null)=>{
      return await createAssignment(assignment,jwt)}
   ,{
      onSuccess:()=>{
         queryClient.invalidateQueries(['assignment','all']);
      }
     })

}