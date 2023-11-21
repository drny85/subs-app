import { z } from 'zod';

export const FormDataSchema = z.object({
   subject: z.string().min(3, { message: 'Subject is too short' }),
   subscriptionPlan: z.enum(['premium', 'basic']).optional().nullable(),
   message: z
      .string()
      .min(6, { message: 'Message must be at least 6 characters.' }),
});
