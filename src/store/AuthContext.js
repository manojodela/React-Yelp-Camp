import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login(token, duartion) { },
    logout() { },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date();
    const adjExpirationTime = new Date(expirationTime);
    const remainingTime = adjExpirationTime - currentTime;
    return remainingTime;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 3600) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return { token: storedToken, duration: remainingTime };
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setIsToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expirationTime) => {
        setIsToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    const logoutHandler = () => {
        setIsToken(null);
        localStorage.clear();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        login: loginHandler,
        logout: logoutHandler,
        isLoggedIn: userIsLoggedIn,
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;