import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({email, password})
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