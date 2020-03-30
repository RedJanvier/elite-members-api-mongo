import { Router } from 'express';
import Shares from '../models/shares';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const shares = await Shares.find().exec();
    return res.status(200).json(shares);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

export default router;
