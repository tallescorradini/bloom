import cloudinary from "../../../services/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: err.message });
  const { galleryId } = req.query;

  try {
    const { encodedImage, imageId } = req.body;
    const image = await cloudinary.uploader.upload(encodedImage, {
      folder: galleryId,
      public_id: imageId,
      transformation: [
        {
          height: 1920,
          quality: "auto:good",
        },
      ],
    });

    res.status(200).json({
      cloudinary: {
        publicId: image.public_id,
        version: image.version,
        url: image.secure_url,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
