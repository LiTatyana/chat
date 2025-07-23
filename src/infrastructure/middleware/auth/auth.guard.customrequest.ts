import { Request } from 'express';
import { TokenPayload } from './auth.guard';

export interface CustomRequest extends Request {
	user?: TokenPayload;
	token?: string;
}
