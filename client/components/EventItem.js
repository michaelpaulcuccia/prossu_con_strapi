import Link from "next/link";
//import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      {/* <div className={styles.img}> */}
      <div>
        {/* <Image
          src={
            evt.image
              ? evt.image.formats.small.url
              : "/images/not_available.png"
          }
          width={185}
          height={165}
        /> */}
        <img className={styles.image} src={
              evt.image
              ? evt.image.formats.small.url
              : "/images/not_available.png"
        } />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}

/*
image: {
    id: 3,
    name: 'bbq_1.jpg',
    alternativeText: '',
    caption: '',
    width: 3903,
    height: 5855,
    formats: {
      thumbnail: [Object],
      large: [Object],
      medium: [Object],
      small: [Object]
    }
*/
