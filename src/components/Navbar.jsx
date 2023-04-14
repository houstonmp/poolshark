import styles from "./Navbar.module.css";
import SharkLogo from "./SharkLogo";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <SharkLogo />
      <h3 className={styles.navTitle}>Poolshark</h3>
    </nav>
  );
};

export default Navbar;
