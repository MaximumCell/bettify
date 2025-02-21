import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js" 


export const createSong = async (req, res) => {
   try {
     if (!req.files|| !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({message: "Please upload all files"});
     }

     const {title, artist, albumId, duration} = req.body;
     const audioFile = req.files.audioFile
     const imageFile = req.files.imageFile

     const song = new Song({
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId: albumId || null
     });

    await song.save();
    if (albumId) {
        await Album.findByIdAndUpdate(albumId, {
            $push: {songs: song._id},
        })
    }
    res.status(200).json(song)
} catch (error) {
    console.log("Error in creating Song",error)
    return res.status(500).json({message: "Internel Server error", error});
   }
};