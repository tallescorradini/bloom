import { useState } from "react";
import styles from "./DrawerBottom.module.scss";

export function DrawerBottom({ onClose, children }) {
  return (
    <div>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={styles.backdrop}
      ></div>

      <div className={styles.drawer}>{children}</div>
    </div>
  );
}
