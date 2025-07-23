import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from './auth.guard.customrequest';
import { TokenPayload } from './auth.guard.tokenpayload';

export { TokenPayload };

export const jwtSecret = String(process.env.JWT_SECRET);

export const authGuard = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const auth = req.header('authorization');

	if (!auth) {
		return res.status(401).json({ error: 'Missing Authorization header' });
	}
	if (!auth?.startsWith('Bearer ')) {
		throw new Error('Missing Bearer token');
	}

	const token = auth.slice(7);

	if (!token) {
		throw new Error('Token not found');
	}

	try {
		req.user = jwt.verify(token, jwtSecret) as TokenPayload;
		req.token = token;
		next();
	} catch (e) {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}
};
