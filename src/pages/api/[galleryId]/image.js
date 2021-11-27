var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const { galleryId } = req.query;

  try {
    const { encodedImage, imageId } = req.body;
    const image = await cloudinary.uploader.upload(encodedImage, {
      folder: galleryId,
      public_id: imageId,
    });
    res.status(200).json({ id: image.public_id, src: image.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
