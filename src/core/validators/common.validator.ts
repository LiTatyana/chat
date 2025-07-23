import { z } from 'zod';

export const paramId = z.string().length(24);

export const objectId = paramId.optional();
