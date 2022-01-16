import cloudinary from "../../../services/cloudinary";

export default async function handler(req, res) {
  const { galleryId } = req.query;

  switch (req.method) {
    case "DELETE": {
      try {
        await cloudinary.api.delete_resources_by_prefix(galleryId);
        await cloudinary.api.delete_folder(galleryId);
      } catch (err) {
        if (err.error?.http_code === 404)
          return res.status(200).json({ result: "ok" });
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({ result: "ok" });
    }

    default:
      return res.status(405).json({ error: "Not allowed" });
  }
}
