import styles from "./AppBarBottom.module.scss";
import { ImageInput } from "../ImageInput/ImageInput";

export function AppBarBottom({
  onPrintQrClick,
  onAddImage,
  onEditGalleryClick,
}) {
  return (
    <div className={styles.appBar}>
      <button
        onClick={onPrintQrClick}
        aria-label="Imprimir etiqueta da galeria"
        className={styles.qrButton}
      >
        <span aria-hidden="true" className="icon lg qrcode"></span>
      </button>

      <ImageInput
        onAddImage={onAddImage}
        id={"image-fab"}
        className={styles.fab}
      />

      <button
        onClick={onEditGalleryClick}
        aria-label="Editar galeria"
        className={styles.editButton}
      >
        <span aria-hidden="true" className="icon lg pencil"></span>
      </button>
    </div>
  );
}
