import { Router } from 'express';
import * as members from '../controllers/members';
import upload from '../helpers/upload';

const router = Router();

router
  .route('/')
  .get(members.getAll)
  .post(upload.single('memberImage'), members.create);

router
  .route('/:memberId')
  .patch(members.edit)
  .get(members.getSingle)
  .delete(members.deleteOne);

export default router;
