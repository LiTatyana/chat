import { NextFunction, Response, Router } from 'express';
import { token } from 'morgan';
import { asyncHandler } from '../../infrastructure/errors/async.error';
import { authGuard } from '../../infrastructure/middleware/auth/auth.guard';
import { CustomRequest } from '../../infrastructure/middleware/auth/auth.guard.customrequest';
import { authService } from '../services/auth.service';
import { loginValidator } from '../validators/login.validator';
import { createUser } from '../validators/user.validator';

const authRouter = Router();

authRouter.post('/registration', async (req, res, next) => {
	const data = createUser.parse(req.body);

	const user = await authService.register(data);
	res.status(200).json({
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
		},
	});
});

authRouter.post('/login', async (req, res, next) => {
	const data = loginValidator.parse(req.body);

	const user = await authService.login(data.email, data.password);
	res.status(200).json({
		data: { user: user, token: token },
	});
});

authRouter.post(
	'/logout',
	asyncHandler(authGuard),
	asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
		const token = req.token;

		if (!token) {
			return res.status(400).json({ message: 'Token is not found' });
		}

		await authService.logout(token);
		res.status(200).json({ message: 'Logged out' });
	}),
);
export default authRouter;
