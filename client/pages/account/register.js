import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        //password validation
        if(password !== passwordConfirm) {
            toast.error('Passwords do not match!')
            return
        }

        console.log({username, email, password});

        //clears form
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }

    return (
        <Layout title='User Registration'>
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Register
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Username</label>
                        <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='passwordConfirm'>Confirm Password</label>
                        <input type='password' value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
                    </div>
                    <input type='submit' value='Register' className='btn' />
                </form>
                <p>Already have an account? <Link href='/account/login'>Login</Link></p>
            </div>
        </Layout>
    )
}

