import { authentication,authorize } from '../middleware/auth.middleware.js';
import { updatePassword,sendResetEmail,resetPassword } from '../controllers/user.controller.js';
import {Router} from 'express';


const router = Router();

router.put('/password',authentication, updatePassword);
router.post("/send-reset-email", sendResetEmail);
router.post("/reset-password", resetPassword);

export default router;