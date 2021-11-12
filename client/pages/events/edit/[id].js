import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {FaImage} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function EditEventPage({evt}) {

    const router = useRouter();

    //console.log(router.query.id)
    const id = router.query.id;

    const [values, setValues] = useState({
      name: evt.name,
      venue: evt.venue,
      address: evt.address,
      members: evt.members,
      date: evt.data,
      time: evt.time,
      description: evt.description
    });

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');

        if(hasEmptyFields) {
            toast.error('No empty fields!')
        }

        const res = await fetch(`${API_URL}/events/${id}`, {
            method: "PUT",
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
            <h1>Edit Event</h1>
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
                             value={moment(values.date).format('yyy-MM-DD')}
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

                <input type="submit" value='Update Event' className='btn'></input>

            </form>

            <div>
                <h2>Event Image</h2>
                    {imagePreview ? (
                        <Image src={imagePreview} height={187} width={130} />
                    ) :
                    <div>
                        <p>No Image uploaded</p>
                    </div>
                }
                <div> 
                    <button 
                        className='btn-secondary-no_margins' 
                        onClick={() => setShowModal(true)}
                    >
                        <FaImage /> Set Image
                    </button>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload />
            </Modal>
          
        </Layout>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();

    return {
        props: {
            evt
        }
    }
}