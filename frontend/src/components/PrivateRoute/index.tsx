import {useLocalStorage} from "../../util/useLocalStorage";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

interface PrivateRouteProps {
   children: ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
   const [jwt] = useLocalStorage('jwt', '');
   return <>
      {jwt ? children : <Navigate to="/login"/>}
   </>
}

export default PrivateRoute;