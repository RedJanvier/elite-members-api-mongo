import { Router } from 'express';
import memberRoutes from './members';
import sharesRoutes from './shares';

const router = Router();

router.use('/members', memberRoutes);
router.use('/shares', sharesRoutes);

export default router;
