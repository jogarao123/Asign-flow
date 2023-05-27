import './App.css'
import {useEffect, useState} from "react";

interface RequestBody {
    username: string,
    password: string
}

function App() {
    const [token, setToken] = useState<string | null>("")
    const data: RequestBody = {username: 'jogs', password: '1234'};

    useEffect(() => {
        fetch(`http://localhost:8080/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                return Promise.all([res.json(), res.headers]);
            })
            .then(([resJson, headers]) => {
                setToken(headers.get('Authorization'))
                console.log('res is ', resJson)
            });

    }, [])

    return (
        <>
            Hello
            <div>
                token is {token}
            </div>
        </>
    )
}

export default App
