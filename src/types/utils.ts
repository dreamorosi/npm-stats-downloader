import { z } from 'zod';
import { WeeklyDownloadsRequestSchema } from '../schemas/WeeklyDownloadsRequest';
import { NpmAPIPointResponseSchema } from '../schemas/NpmAPIPointResponse';
import type { ZodType } from 'zod';

/**
 * The options to use when parsing an object
 */
type ParseObjectOptions<SomeSchema extends ZodType> = {
  /**
   * The zod schema to use to parse the object
   */
  schema: SomeSchema;
  /**
   * The object to parse
   */
  object: unknown;
};

/**
 * The output of the parseResponse function
 */
type ParseObjectOutput<T extends ZodType> = z.infer<T>;

/**
 * A composite date object that contains
 * the date, year, month and day.
 */
type DateComposite = {
  /**
   * Date object stored to allow further operations
   */
  date: Date;
  /**
   * The full year corresponding to the date
   * @example 2020
   */
  year: number;
  /**
   * The month corresponding to the date corrected
   * for January being month 0.
   * @example 1
   */
  month: number;
  /**
   * The day corresponding to the date
   * @example 10
   */
  day: number;
};

/**
 * The object containing the objects corresponding
 * to the start and end of the week.
 * @example
 * {
 *   start: {
 *     date: new Date('2020-01-01'),
 *     year: 2020,
 *     month: 0,
 *     day: 1
 *   },
 *   end: {
 *     date: new Date('2020-01-07'),
 *     year: 2020,
 *     month: 0,
 *     day: 7
 *   }
 * }
 */
type PrecedingWeekStartEndDates = {
  /**
   * The object corresponsing to the Monday (start of week)
   */
  start: DateComposite;
  /**
   * The object corresponding to the Sunday (end of week)
   */
  end: DateComposite;
};

/**
 * Inferred type of WeeklyDownloadsRequest schema
 */
type WeeklyDownloadsRequestParsed = z.infer<
  typeof WeeklyDownloadsRequestSchema
>;

/**
 * Inferred type of NpmAPIPointResponse schema
 */
type NpmAPIPointResponse = z.infer<typeof NpmAPIPointResponseSchema>;

export type {
  ParseObjectOptions,
  ParseObjectOutput,
  DateComposite,
  PrecedingWeekStartEndDates,
  WeeklyDownloadsRequestParsed,
  NpmAPIPointResponse,
};
