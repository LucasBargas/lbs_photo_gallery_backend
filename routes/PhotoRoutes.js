import express from 'express';
import PhotoControllers from '../controllers/PhotoControllers';

// Middlewares
import CheckToken from '../middlewares/CheckToken';
import imageUpload from '../middlewares/imageUpload';

const router = express.Router();

router.post(
  '/register',
  CheckToken.handleCheckToken,
  imageUpload.single('singlePhoto'),
  PhotoControllers.register,
);
router.delete(
  '/delete/:id',
  CheckToken.handleCheckToken,
  PhotoControllers.deletePhotoById,
);
router.get('/:userName', PhotoControllers.photosByUserName);
router.get('/', PhotoControllers.allPhotos);

export default router;
