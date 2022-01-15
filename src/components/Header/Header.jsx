import styles from "./Header.module.scss";

export function Header({ title, onClose, onReturn }) {
  function getHeaderLayoutClassName() {
    if (!!onClose) return "headerWithCloseButton";
    if (!!onReturn) return "headerWithReturnButton";
  }

  return (
    <header className={styles[getHeaderLayoutClassName()]}>
      <button onClick={onReturn} className={styles.return}>
        <span aria-hidden="true" className="icon sm chevronLeft"></span>
      </button>
      <h2 className={styles.title}>{title}</h2>
      <button onClick={onClose} className={styles.close}>
        <span aria-hidden="true" className="icon sm close"></span>
      </button>
    </header>
  );
}
