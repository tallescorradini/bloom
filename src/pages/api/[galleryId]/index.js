import util from "util";

import cloudinary from "../../../services/cloudinary";

export default async function handler(req, res) {
  const { galleryId } = req.query;

  switch (req.method) {
    case "DELETE": {
      try {
        const deleteFolderImages = util.promisify(
          cloudinary.api.delete_resources_by_prefix
        );
        await deleteFolderImages(galleryId);
      } catch (e) {
        return res.status(400).json({ error: e.message });
      }
      try {
        const deleteFolder = util.promisify(cloudinary.api.delete_folder);
        await deleteFolder(galleryId);
      } catch (e) {
        if (e.http_code === 404) return res.status(200).json("ok");
        return res.status(400).json({ error: e.message });
      }
      return res.status(200).json("ok");
    }

    default:
      return res.status(405).json({ error: "Not allowed" });
  }
}
