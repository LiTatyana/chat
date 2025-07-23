import z from 'zod';

export const createMessage = z.object({
	data: z.string().min(1),
	from_user_id: z.string().min(1),
	to_user_id: z.string().min(1),
});

export type createMessageType = z.infer<typeof createMessage>;
