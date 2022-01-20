import cloudinary from "../../../services/cloudinary";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE": {
      const { galleryId, imageId } = req.query;
      const public_id = `${galleryId}/${imageId}`;
      try {
        await cloudinary.uploader.destroy(public_id);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }

      return res.status(200).json({ result: "ok" });
    }

    default:
      return res.status(405).json({ error: "Not allowed" });
  }
}
