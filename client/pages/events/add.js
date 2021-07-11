import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function AddEventPage() {

    const router = useRouter();

    const [values, setValues] = useState({
      name: "",
      venue: "",
      address: "",
      members: "",
      date: "",
      time: "",
      description: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(values);

        //validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('No empty fields!')
        }

        const res = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if (!res.ok) {
            toast.error('That did not work!')
        } else {
            const data = await res.json();
            //redirect to new event
            router.push(`/events/${data.slug}`);
        }
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    return (
        <Layout
            title='Add New Event'
        >
            <Link href='/events'>Go Back</Link>
            <h1>Add Event</h1>
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
            />
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <div className={styles.grid}>

                    <div>
                        <label htmlFor='name'>Event Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={values.name}
                                onChange={handleInputChange}
                            />
                    </div>

                    <div>
                        <label htmlFor='performers'>Members</label>
                            <input
                                type='text'
                                name='members'
                                id='members'
                                value={values.members}
                                onChange={handleInputChange}
                            />
                    </div>
          
                    <div>
                        <label htmlFor='venue'>Venue</label>
                            <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                name='address'
                                id='address'
                                value={values.address}
                                onChange={handleInputChange}
                        />
                    </div>
          
                    <div>
                        <label htmlFor='date'>Date</label>
                            <input
                             type='date'
                             name='date'
                             id='date'
                             value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='time'>Time</label>
                            <input
                                type='text'
                                name='time'
                                id='time'
                                value={values.time}
                                onChange={handleInputChange}
                            />
                    </div>

                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                        <textarea
                            type='text'
                            name='description'
                            id='description'
                            value={values.description}
                            onChange={handleInputChange}
                        ></textarea>
                </div>

                <input type="submit" value='Add Event' className='btn'></input>

            </form>
        </Layout>
    )
}
