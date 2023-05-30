import {useLocalStorage} from "../../util/useLocalStorage";
import {Navigate} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import {validateToken} from "../../util/api.ts";

interface PrivateRouteProps {
   children: ReactNode;
}

function PrivateRoute({children}: PrivateRouteProps) {
   const [jwt] = useLocalStorage('jwt', '');
   const [isLoading, setisLoading] = useState(true);
   const [isValid, setIsValid] = useState(false);

   useEffect(() => {
        if (jwt) {
           validateToken(jwt).then((res) => {
              setisLoading(false);
              setIsValid(res);
           }).catch(() => {
              setisLoading(false)
              setIsValid(false);
           })
        } else
           setisLoading(false);
     }
   )

   return <>
      {isLoading ? (<h2>Loading...</h2>) :
        (jwt ? (isValid ? children : <Navigate to="/login"/>)
          : <Navigate to="/login"/>)}
   </>
}

export default PrivateRoute;