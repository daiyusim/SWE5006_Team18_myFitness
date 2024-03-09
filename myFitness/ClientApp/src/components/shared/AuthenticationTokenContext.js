import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthenticationTokenContext = createContext([null, null, null, (newToken) => { }]);

export function useAuthenticationToken() {
    return useContext(AuthenticationTokenContext);
}

export function AuthenticationTokenProvider({ children }) {
    const [authenticationToken, changeAuthenticationToken] = useState();

    const setAuthenticationToken = (newToken) => {
        if (typeof newToken == 'string') {
            localStorage.setItem('authToken', newToken);
            changeAuthenticationToken(jwtDecode(newToken));
        }
        else {
            changeAuthenticationToken(newToken);
        }
    };


    return (
        <AuthenticationTokenContext.Provider value={[authenticationToken, setAuthenticationToken]}>
            {children}
        </AuthenticationTokenContext.Provider>
    );
};