import multer from 'multer';
import path from 'path';

// Destination to store the images
const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = '';

    if (req.baseUrl.includes('users')) {
      folder = 'users';
    } else if (req.baseUrl.includes('photos')) {
      folder = 'photos';
    }

    callback(null, `uploads/images/${folder}/`);
  },
  filename: (req, file, callback) => {
    callback(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname),
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
      return callback(
        new Error('Por favor, envie apenas fotos png, jpg ou webp.'),
      );
    }

    callback(undefined, true);
  },
});

export default imageUpload;
