import { Album } from "../models/album.model.js";

export const getAllAlbum = async (req, res, next) => {
  try {
    const album = await Album.find();
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res.status(400).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
