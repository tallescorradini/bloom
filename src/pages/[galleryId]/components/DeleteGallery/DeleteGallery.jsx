import { useEffect, useState } from "react";
import styles from "./DeleteGallery.module.scss";

export function DeleteGallery({ onDeleteGallery }) {
  const [isDisabled, setIsDisabled] = useState(false);
  function handleConfirmDelete() {
    setIsDisabled(true);
  }

  useEffect(() => {
    if (isDisabled) onDeleteGallery();
  }, [isDisabled]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Deseja realmente deletar esta galeria?</h2>
      <button
        onClick={handleConfirmDelete}
        disabled={isDisabled}
        className={styles.buttonConfirm}
      >
        Confirmar
      </button>
    </div>
  );
}
