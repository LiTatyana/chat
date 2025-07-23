import { Router } from 'express';
import { userService } from '../services/user.service';
import { paramId } from '../validators/common.validator';
import { createUser } from '../validators/user.validator';

const userRouter = Router();

userRouter.get('/:id', async (req, res, next) => {
	const data = paramId.parse(req.params.id);

	const user = await userService.getById(data);
	res.status(200).json({
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
		},
	});
});

userRouter.post('/', async (req, res, next) => {
	const body = createUser.parse(req.body);

	const user = await userService.create(body);
	res.status(200).json({
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
		},
	});
});

export default userRouter;
