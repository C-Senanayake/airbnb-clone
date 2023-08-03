import multer from 'multer';
import fs from 'fs';
import imageDownloader from 'image-downloader';
import Place from '../models/place.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__filename);
// console.log(dirname(__dirname));

export const uploadByLink = async (req,res)=>{
    const {link} =req.body;
    const filenam ='photo-' + Date.now()+'.jpg';
    // console.log(Date.now());
    imageDownloader.image({
        url:link,
        dest: dirname(__dirname) + '/uploads/' + filenam,
    })
    .then(({ filename }) => {
        console.log('Saved to', filenam); // saved to /path/to/dest/image.jpg
        res.status(201).json(filenam);
    })
    .catch((err) => console.error(err));
}

const photosMiddleware = multer({dest:'uploads/'})

// array is the accepting type. 'photos' is the array key name sent from frontend, 100 is the maximum number of photos
export const photosMiddlewarer = photosMiddleware.array('photos',100);

export const upload = async (req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        //renames path tp newPath
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    console.log(uploadedFiles);
    res.json(uploadedFiles);
}