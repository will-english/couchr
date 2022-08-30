import { useState } from 'react';
// import { useToken } from '../utils/auth_provider';


function Login() {
    // const funcs = useToken();
    // const login = funcs[1];
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        // setErrors(validation(values))
        // console.log('login inside', login)
        // await login(username, password);
        };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setUsername(e.target.value)} placeholder="username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" required type="text" name="password" id="password" className="form-control" />
                            <label htmlFor="password">password</label>
                        </div>
                        <button className="btn btn-primary submitButton" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login