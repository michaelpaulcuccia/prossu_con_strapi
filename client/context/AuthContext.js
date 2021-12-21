import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    //Register
    const register = async (user) => {
        console.log(user)
    };

    //Login
    //'identifier' is unique to Strapi
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier, password
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.ok){
            setUser(data.user)
        } else {
            //from api/login.js
            //res.status(data.statusCode).json({message: data.message[0].messages[0].message});
            setError(data.message);
            setError(null);
        }
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