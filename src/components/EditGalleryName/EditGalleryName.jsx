import { useState } from "react";
import styles from "./EditGalleryName.module.scss";

export function EditGalleryName({
  galleryName,
  onGalleryNameChange,
  onReturn,
}) {
  const [newName, setNewName] = useState(galleryName);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    if (newName !== galleryName) onGalleryNameChange(newName);
    onReturn();
  }

  function handleNewNameChange(e) {
    setNewName(e.target.value.replace(/[^a-z0-9 ]/gi, ""));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.textField}>
        <label htmlFor="gallery-name">Nome da galeria</label>
        <input
          value={newName}
          onChange={handleNewNameChange}
          autoComplete="off"
          id="gallery-name"
          type="text"
        />
      </div>
      <button type="submit" className={styles.buttonConfirm}>
        Confirmar
      </button>
    </form>
  );
}
