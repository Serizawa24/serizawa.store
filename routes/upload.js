import express from 'express';
import { changeAvatar } from '../controllers/upload.js'
import upload from '../util/upload.js';

const router = express.Router();

router.put('/avatar',upload.single('avatar'),changeAvatar);
export default router;