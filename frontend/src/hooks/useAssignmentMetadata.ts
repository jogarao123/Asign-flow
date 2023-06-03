import {useQuery} from "react-query";
import {useLocalStorage} from "../util/useLocalStorage.ts";
import {fetchAssignmentMetadata} from "../util/api.ts";

export const useAssignmentMetadata = () => {
   const [jwt] = useLocalStorage('jwt', '');
   return useQuery('assignment-metadata', async () => {
      return fetchAssignmentMetadata(jwt);
   });
};