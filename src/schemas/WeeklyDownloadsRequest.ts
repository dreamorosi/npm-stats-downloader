import { z } from 'zod';

const WeeklyDownloadsRequestSchema = z.object({
  packages: z.array(z.string()).min(1).max(128),
  date: z.date().optional().default(new Date()),
});

export { WeeklyDownloadsRequestSchema };
