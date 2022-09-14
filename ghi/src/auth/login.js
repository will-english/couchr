import { useState } from 'react';
import { useToken } from './auth_provider';
import { useAuthContext } from './auth_provider';
import "../CSSfile/SignInPage.css";

function Login() {
    const funcs = useToken();
    const login = funcs[1];

    const signup = funcs[3];
    const createLists = funcs[6];

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const { userName } = useAuthContext();

    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
     
        await login(username, password);
        };

    const handleSubmitSignUp = async e => {
        e.preventDefault()
        console.log('signup try')
        // setErrors(validation(values))
        // console.log('login inside', login)
        
        await signup(username, password, email, firstName, lastName, createLists);

        };


    const handleClickSignUp = (e) => {
        const signUp = document.getElementById("login-box")
        signUp.classList.add("right-panel-active")
    };

    const handleClickSignIn = (e) => {
        const signIn = document.getElementById("login-box")
        signIn.classList.remove("right-panel-active")
    };
    
    const handleInputFocus = (e) => {
        e.target.className = "focus"
    };

    const handleInputBlur = (e) => {
        if (e.target.value === ""){
            e.target.className = ""
        }
    };



    return (
        <div className="loginPage">
            <div className="container1" id="login-box">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmitSignUp}>
                        <h1 className="signinpageH1">Sign Up</h1>
                        <div className="txtb">
                            <input onChange={(e) => setUsername(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} type="text" required name="username" id="username"/>
                            <span data-placeholder="Username"></span>
                        </div>
                        <div className="txtb">
                            <input onChange={(e) => setEmail(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} required type="text" name="email" id="email"/>
                            <span data-placeholder="Email"></span>
                        </div>
                        <div className="txtb">
                            <input onChange={(e) => setPassword(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} type="text" required name="password" id="password"/>
                            <span data-placeholder="Password"></span>
                        </div>
                        <div className="txtb">
                            <input onFocus={handleInputFocus} onBlur={handleInputBlur} type="password" />
                            <span data-placeholder="Confirm Password"></span>
                        </div>

                        <div className="txtb">
                            <input onChange={(e) => setFirstName(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} required type="text" name="firstName" id="firstName" />
                            <span data-placeholder="First Name"></span>
                        </div>
                        <div className="txtb">
                            <input onChange={(e) => setLastName(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} required type="text" name="lastName" id="lastName" />
                            <span data-placeholder="Last Name"></span>
                        </div>

                        <button className="signpageButton" type="submit">Register</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#" onSubmit={handleSubmit}>
                        <h1 className="signinpageH1">Login</h1>
                        <div className="txtb">
                            <input onChange={(e) => setUsername(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} required type="text" name="username" id="username" />
                            <span data-placeholder="Username"></span>
                        </div>
                        <div className="txtb">
                            <input onChange={(e) => setPassword(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} required type="text" name="password" id="password" />
                            <span data-placeholder="Password"></span>
                        </div>
                        <a href="#">Forgot your password?</a>
                        <button type="submit" className="signpageButton">Login</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="signinpageH1">Already have an account?</h1>
                            <p className="signinpageP">Please login with your account!</p>
                            <button onClick={handleClickSignIn} className="ghost signpageButton" id="signIn">login</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="signinpageH1">Don't have an account?</h1>
                            <p className="signinpageP">Join us for FREE!</p>
                            <button onClick={handleClickSignUp} className="ghost signpageButton" id="signUp">Sign Up</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login