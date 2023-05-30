import {useLocalStorage} from "../../util/useLocalStorage";
import {useState} from "react";
import {LoginCredentials, URL} from "../../types/types.ts";


function LoginPage() {
   const [credentials, setCredentials] = useState<LoginCredentials>({username: '', password: ''});
   const [, setJwt] = useLocalStorage('jwt', '');
   const handleLogin = () => {
      fetch(`${URL}/api/auth/login`,
        {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify(credentials)
        })
        .then(res => {
           if (res.status === 200)
              return Promise.all([res.json(), res.headers]);
           else
              return Promise.reject("Invalid Login attempt");
        })
        .then(([, headers]) => {
           setJwt(headers.get('Authorization') || '')
           window.location.href = 'dashboard'
        })
        .catch((msg) => {
           alert(msg)
        })
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setCredentials((prevCreds) => ({
         ...prevCreds,
         [name]: value
      }))
   }
   return <>
      <div>
         <label>Username</label>
         <input type="text"
                name="username"
                id="username"
                value={credentials.username}
                onChange={handleChange}/>
      </div>
      <div>
         <label>Password</label>
         <input
           type="text"
           name="password"
           id="password"
           value={credentials.password}
           onChange={handleChange}/>
      </div>
      <div>
         <button onClick={handleLogin}>Login</button>
      </div>
   </>
}

export default LoginPage;