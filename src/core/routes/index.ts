import { Router } from 'express';
import authRouter from './auth.router';
import messageRouter from './message.router';
import userRouter from './user.router';

const router = Router();

router.use('/users', userRouter);
router.use('/authGuard', authRouter);
router.use('/message', messageRouter);

export default router;
