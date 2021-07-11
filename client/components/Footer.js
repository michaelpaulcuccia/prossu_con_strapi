import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; metuchenLOCALE 2021</p>
      {props.currentUrl !== "/about" && (
        <p>
          <Link href="/about">About Us</Link>
        </p>
      )}
    </footer>
  );
}
