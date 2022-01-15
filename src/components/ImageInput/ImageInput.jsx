import { useRef } from "react";

import styles from "./ImageInput.module.scss";

export function ImageInput({ onAddImage, id }) {
  const imageInputRef = useRef();

  return (
    <div id={id} className={styles.fab}>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onAddImage}
        ref={imageInputRef}
        accept="image/x-png,image/jpeg"
      />
      <button
        onClick={() => {
          imageInputRef.current.click();
        }}
        aria-label="Nova foto"
      >
        <span aria-hidden="true" className="icon xl cameraFilled"></span>
      </button>
    </div>
  );
}
