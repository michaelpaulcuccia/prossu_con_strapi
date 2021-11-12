import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css';

export default function Modal({ show, onClose, children, title }) {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => setIsBrowser(true));

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href='#' onClick={handleClose}>
                        <FaTimes />
                    </a>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <div>
            
        </div>
    )
}
