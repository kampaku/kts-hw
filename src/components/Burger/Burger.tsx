import styles from "./Burger.module.scss";

export const Burger = () => {
  return (
    <div className={styles.burger}>
      <div className={styles.burger__line}></div>
      <div className={styles.burger__line}></div>
      <div className={styles.burger__line}></div>
    </div>
  );
};
