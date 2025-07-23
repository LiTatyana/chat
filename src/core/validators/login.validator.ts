import { z } from 'zod';

export const loginValidator = z.object({
	email: z.email(),
	password: z.string().min(8).max(64),
});

export type loginValidatorType = z.infer<typeof loginValidator>;
