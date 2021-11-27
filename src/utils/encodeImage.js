export function encodeImage(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64EncodedImage = reader.result;
      resolve(base64EncodedImage);
    };

    reader.onerror = reject;

    reader.readAsDataURL(imageFile);
  });
}
