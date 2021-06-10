import Layout from '@/components/Layout';
import styles from '@/styles/About.module.css';

export default function AboutPage() {
    return (
        <Layout
            title='About metuchenUNDERGROUND'
        >
            <div className={styles.content}>
                <h1>About</h1>
                <p>Find the latest underground events in Metuchen, New Jersey</p>
                <small>Version 1.0.0</small>
            </div>
        </Layout>
    )
}
