import { useRef } from "react";

import styles from "./ImageInput.module.scss";

export function ImageInput({ onImageChange }) {
  const imageInputRef = useRef();

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onImageChange}
        ref={imageInputRef}
        accept="image/x-png,image/jpeg"
      />
      <button
        onClick={() => {
          imageInputRef.current.click();
        }}
        aria-label="Nova foto"
        className={styles.fab}
      >
        <span aria-hidden="true" className="icon xl cameraFilled"></span>
      </button>
    </>
  );
}
