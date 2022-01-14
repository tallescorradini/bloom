import { useRef, useEffect } from "react";
import QRCode from "qrcode";

export function QRCodeCanvas({ text, width }) {
  const canvasRef = useRef();

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, text, { width: width }, (e) => {
      // console.log(e);
    });
  }, [text]);

  return <canvas ref={canvasRef} id="canvas"></canvas>;
}
