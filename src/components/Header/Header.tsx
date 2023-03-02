import { Burger } from "@components/Burger";
import { Link } from "react-router-dom";

import basket from "./bag-2.svg";
import styles from "./Header.module.scss";
import logo from "./logo.svg";
import user from "./user.svg";

const Header = () => {
  return (
    <div className={styles.header__border}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.header__logo}>
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className={styles.header__nav}>
            <span className={styles.header__link}>Products</span>
            <span>Categories</span>
            <span>About Us</span>
          </nav>
          <div className={styles.header__controls}>
            <img src={basket} alt={"basket"} />
            <img src={user} alt={"user"} />
          </div>
          <Burger />
        </header>
      </div>
    </div>
  );
};

export default Header;
