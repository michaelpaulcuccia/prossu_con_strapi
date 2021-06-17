import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import Link from 'next/link';

export default function HomePage({ events }) {

  return (
    <Layout>
      <h1>Upcoming</h1>
      {events.length === 0 && <h3>No Events</h3>}
      {events.map(evt => (
        <EventItem 
        key={evt.id}
        evt={evt}
        />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )

}

//fetches at build-time, revalidates every 1 second
export async function getStaticProps() {

  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      //only up to first 3  
      events:events.slice(0,3)
    },
    revalidate: 1
  }

}