import express from 'express';
import UserControllers from '../controllers/UserControllers';

// Middlewares
import CheckToken from '../middlewares/CheckToken';
import imageUpload from '../middlewares/imageUpload';

const router = express.Router();

router.post('/register', UserControllers.registerUser);
router.post('/login', UserControllers.loginUser);
router.patch(
  '/edit',
  CheckToken.handleCheckToken,
  imageUpload.single('userPhoto'),
  UserControllers.editUser,
);
router.delete(
  '/delete',
  CheckToken.handleCheckToken,
  UserControllers.deleteUser,
);
router.get(
  '/auth-user',
  CheckToken.handleCheckToken,
  UserControllers.getAuthUser,
);
router.get('/:userName', UserControllers.getUserByUserName);
router.get('/', UserControllers.getAllUsers);

export default router;
