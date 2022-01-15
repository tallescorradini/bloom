import { useEffect, useState } from "react";
import styles from "./DeleteGallery.module.scss";

export function DeleteGallery({ onDeleteGallery }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirmDelete() {
    setIsDisabled(true);
    setIsLoading(true);
  }

  useEffect(() => {
    if (isDisabled) onDeleteGallery();
  }, [isDisabled]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Deseja realmente excluir esta galeria?</h2>
      <button
        onClick={handleConfirmDelete}
        disabled={isDisabled}
        className={styles.buttonConfirm}
      >
        {isLoading ? "Excluindo..." : "Confirmar"}
      </button>
    </div>
  );
}
