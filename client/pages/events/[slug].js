import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes} from 'react-icons/fa'
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css'

export default function EventPage({ evt }) {

    console.log(evt)

    const deleteEvent = () => {
        console.log('delete event clicked');
    }

    return (
        <Layout>
           <div className={styles.event}>
               <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete}
                    onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
               </div>
           </div>
           <span>
               {evt.date} at {evt.time}
           </span>
           <h1>{evt.name}</h1>
           {evt.image && (
               <div className={styles.image}>
                   <Image src={evt.image} width={400} height={400}/>
               </div>
           )}
           <h3>Sponsored by {evt.members}</h3>
           <h3>Description: {evt.description}</h3>
           <h3>Venue: {evt.venue}</h3>
           <p>{evt.address}</p>
           <Link href='/events'>
               <a className={styles.back}>
                  {'<'} Go back
               </a>
           </Link>
        </Layout>
    )
}

//destructure context object to get query, to get slug
/*
export async function getServerSideProps({query: {slug}}) {

    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json()

    return {
        props: {
            evt: events[0]
        }
    }
}
*/

export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    const paths = events.map(evt => ({
        params: {slug: evt.slug}
    }))

    return {
        paths,
        //false = shows 404 if path isn't found
        //true = look for path, even if it doesn't generate at buildtime
        fallback: true
    }
}

export async function getStaticProps({params: {slug}}) {

    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json()

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1
    }
}