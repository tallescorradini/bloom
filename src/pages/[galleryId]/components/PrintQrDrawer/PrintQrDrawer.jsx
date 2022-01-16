import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import styles from "./PrintQrDrawer.module.scss";
import { DrawerBottom } from "../../../../components/DrawerBottom/DrawerBottom";
import { Header } from "../../../../components/Header/Header";
import { GalleryPrintTemplate } from "../../../../components/GalleryPrintTemplate";

export function PrintQrDrawer({ gallery, open, onClose }) {
  if (!open) return null;
  const printLayout = useRef();

  const handlePrintQrCode = useReactToPrint({
    content: () => printLayout.current,
  });

  function handleClose() {
    onClose();
  }

  return (
    <DrawerBottom onClose={handleClose}>
      <Header title="Opções" onClose={handleClose} />

      <button onClick={handlePrintQrCode} className={styles.buttonPrimary}>
        <span aria-hidden="true" className="icon sm-md qrcode"></span>
        Imprimir etiqueta
      </button>

      <GalleryPrintTemplate
        printGalleries={[
          {
            id: gallery.id,
            name: gallery.name,
            url: `${
              process.env.NEXT_PUBLIC_VERCEL_URL ||
              process.env.NEXT_PUBLIC_APP_URL
            }/${gallery.id}`,
          },
        ]}
        copy={true}
        ref={printLayout}
      />
    </DrawerBottom>
  );
}
