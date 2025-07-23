import { z } from 'zod';

export const updateMessage = z.object({
	message_id: z.string().min(1),
	data: z.string().min(1),
});
export type updateMessageType = z.infer<typeof updateMessage>;
