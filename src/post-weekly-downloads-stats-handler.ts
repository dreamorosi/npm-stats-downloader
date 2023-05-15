import type { WeeklyDownloadsRequest } from './types';
import { WeeklyDownloadsRequestSchema } from './schemas/WeeklyDownloadsRequest';
import { sub } from 'date-fns';
import { parseObjectWithSchema } from './utils';
import { NpmStatsClient } from 'NpmStatsClient';

const npmStatsClient = new NpmStatsClient();

export const handler = async (event: WeeklyDownloadsRequest): Promise<void> => {
  const { packages, date } = parseObjectWithSchema({
    schema: WeeklyDownloadsRequestSchema,
    object: event,
  });
  const dateMinusOneWeek = sub(date, { weeks: 1 });

  const weeklyDownloadsStats = await npmStatsClient.getWeeklyDownloadsStats({
    packages,
    date,
  });
  const precedingWeekDownloadsStats =
    await npmStatsClient.getWeeklyDownloadsStats({
      packages,
      date: dateMinusOneWeek,
    });

  console.log(JSON.stringify(weeklyDownloadsStats, null, 2));
  console.log(JSON.stringify(precedingWeekDownloadsStats, null, 2));
};

`
{
  "logger": "Example text",
  "tracer": "Example text",
  "metrics": "Example text",
  "parameters": "Example text",
  "range": "Example text",
  "commons": "Example text",
  "total": "Example text",
  "bestDay": "Example text",
  "bestDayCount": "Example text",
  "loggerDelta": "Example text",
  "commonsDelta": "Example text",
  "metricsDelta": "Example text",
  "tracerDelta": "Example text",
  "parametersDelta": "Example text",
  "totalDelta": "Example text"
}
`;
