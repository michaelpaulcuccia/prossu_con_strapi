import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    //Register
    const register = async (user) => {
        console.log(user)
    };

    //Login
    //identifier is unique to Strapi
    const login = async ({ email: identifier, password }) => {
        console.log(identifier, password)
    }

    //Logout
    const logout = async () => {
        console.log('logout')
    }

    //Check if user is logged in to persist
    const checkUserLogin = async () => {
        console.log('check')
    };

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext