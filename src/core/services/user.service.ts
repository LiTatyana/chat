import { UserModel } from '@schemas/user.schema';
import { createUserType } from '../validators/user.validator';

class UserService {
	public async getById(id: string) {
		const user = await UserModel.findById(id);

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	public async create(data: createUserType) {
		return await UserModel.create(data);
	}
}

export const userService = new UserService();
