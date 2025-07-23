import { UserModel } from '@schemas/user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CacheService } from '../../infrastructure/middleware/cache.middleware';
import { createUserType } from '../validators/user.validator';

export class AuthService {
	private readonly saltRounds = Number(process.env.SALT_ROUNDS);
	private readonly jwtExpire = String(process.env.JWT_EXPIRE) as jwt.SignOptions['expiresIn'];
	private readonly jwtSecret = String(process.env.JWT_SECRET);

	constructor(private readonly cacheService: CacheService) {}

	public async register(data: createUserType) {
		const hashed = await bcrypt.hash(data.password, this.saltRounds);
		return await UserModel.create({ name: data.name, password: hashed, email: data.email });
	}

	public async login(email: string, password: string) {
		const user = await UserModel.findOne({ email: email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error('User not found');
		}

		//generate token
		const token = jwt.sign({ id: user.id }, this.jwtSecret, { expiresIn: this.jwtExpire });

		if (!token) {
			throw new Error('Not Found');
		}

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}

	public async logout(token: string): Promise<{ success: boolean }> {
		try {
			await this.cacheService.delete(token);
			return { success: true };
		} catch (e) {
			return { success: true };
		}
	}

	public async generateAccessToken(payload: { id: number; user_name: string; email: string }) {
		const token = jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpire });

		await this.cacheService.set(token, payload, this.jwtExpire);
		return { access_token: token };
	}

	public async validateToken(token: string) {
		try {
			//const decoded = await jwt.decode(token, this.jwtSecret) as TokenPayload
		} catch (e) {}
	}
}

const cacheService = new CacheService();

export const authService = new AuthService(cacheService);
