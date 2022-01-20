import { useEffect, useState } from "react";

import styles from "./DeleteImage.module.scss";

export function DeleteImage({ onDeleteImage }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleConfirmDelete() {
    setIsDisabled(true);
    setIsLoading(true);
  }

  useEffect(() => {
    if (isDisabled) onDeleteImage();
  }, [isDisabled]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Deseja realmente excluir esta imagem?</h2>
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
