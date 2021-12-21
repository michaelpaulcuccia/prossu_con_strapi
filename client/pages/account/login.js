import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, error} = useContext(AuthContext);

    useEffect(() => error && toast.error(error))

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ email, password })
        //clears form
        setEmail('');
        setPassword('');
    }

    return (
        <Layout title='User Login'>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Login
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <input type='submit' value='Login' className='btn' />
                </form>
                <p>Don't have an account? <Link href='/account/register'>Register</Link></p>
            </div>
        </Layout>
    )
}
