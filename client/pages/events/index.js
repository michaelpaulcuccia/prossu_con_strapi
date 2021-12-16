import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';

export default function EventsPage({ events, page, total }) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events</h3>}
      {events.map(evt => (
        <EventItem 
        key={evt.id}
        evt={evt}
        />
      ))}
    <Pagination page={page} total={total} />
    </Layout>
  )

}

//set defaul page to 1
//http://localhost:3000/events?page=3

export async function getServerSideProps({ query: { page =  1} }) {

  //calc start page, first convert string to number
  const start = parseInt(page) === 1 ? 0 : parseInt(page -1) * PER_PAGE

  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await eventRes.json();

  return {
    props: {
      events, page: parseInt(page), total
    }
  }

}
