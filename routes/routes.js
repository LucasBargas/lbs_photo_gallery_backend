import express from 'express';
import UserRoutes from './UserRoutes';
import PhotoRoutes from './PhotoRoutes';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/photos', PhotoRoutes);

export default router;
