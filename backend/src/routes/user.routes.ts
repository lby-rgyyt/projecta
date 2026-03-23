import { authentication,authorize } from '../middleware/auth.middleware.js';
import { updatePassword } from '../controllers/user.controller.js';
import {Router} from 'express';


const router = Router();

router.put('/password',authentication, updatePassword);

export default router;