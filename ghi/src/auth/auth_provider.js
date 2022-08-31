import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;

export function getToken() {
    return internalToken;
}

export async function getTokenInternal() {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/mine/`;
    try {
        const response = await fetch(url, {
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            internalToken = data.token;
            console.log(data.token);
            return internalToken;
        }
    } catch (e) { }
    return false;
}

function handleErrorMessage(error) {
    if ("error" in error) {
        error = error.error;
        try {
            error = JSON.parse(error);
            if ("__all__" in error) {
                error = error.__all__;
            }
        } catch { }
    }
    if (Array.isArray(error)) {
        error = error.join("<br>");
    } else if (typeof error === "object") {
        error = Object.entries(error).reduce(
            (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
            ""
        );
    }
    return error;
}

// **********************************************************************

export const AuthContext = createContext({
    userName: null,
    setUserName: () => null,

    token: null,
    setToken: () => null,
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken, userName, setUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

// **********************************************************************

export function useToken() {
    const { token, setToken } = useAuthContext();
    const { userName, setUserName } = useAuthContext();

    const navigate = useNavigate();
    async function fetchToken() {
        const token = await getTokenInternal();
        setToken(token);
    }
    if (!token) {
        fetchToken();
    }

    async function fetchUserName() {
        const userName = JSON.parse(localStorage.getItem('userName'));
        setUserName(userName);
    }
    if (!userName) {
        fetchUserName();
    }

    useEffect(() => {
        fetchToken();
        fetchUserName();
    }, [setToken, token, setUserName, userName]);

    async function logout() {
        console.log('logout try');
        console.log(token);
        if (token) {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/token/refresh/logout/`;
            await fetch(url, {
                method: "delete",
                credentials: "include"
            });
            internalToken = null;
            setToken(null, () => { console.log(token) });
            localStorage.removeItem('userName');
            console.log('inside logout');
            console.log(token);
            navigate("/");
        }
    }

    async function login(username, password) {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/login/`;
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        const response = await fetch(url, {
            method: "post",
            credentials: "include",
            body: form,
        });
        const tokens = await response.json()
        if (response.ok) {
            console.log(tokens)

            const token = await getTokenInternal();
            setToken(token);
            const token1 = tokens['msg'];
            console.log(token1);
            localStorage.setItem('userName', JSON.stringify(username))
            setUserName(username);

            return;
        }
        let error = await response.json();
        console.log(error);
        return handleErrorMessage(error);
    }

    async function signup(username, password, email, firstName, lastName) {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/signup/`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.json());
        if (response.ok) {
            // await login(username, password);
            // console.log(response.json());
        }
        return false;
    }

    async function update(username, password, email, firstName, lastName) {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await login(username, password);
        }
        return false;
    }

    return [token, login, logout, signup, update, userName];
}