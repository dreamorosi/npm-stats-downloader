import { previousMonday, previousSunday } from 'date-fns';
import type { ZodType, ZodError } from 'zod';
import type {
  ParseObjectOptions,
  ParseObjectOutput,
  DateComposite,
  PrecedingWeekStartEndDates,
} from './types/utils';

/**
 * Build the request paths for the given packages and dates range.
 *
 * @example
 * `/point/2022-01-01:2022-01-02/@aws-lambda-powertools/logger`
 *
 * @param packages A list of npm packages
 * @param start A date object that represents the start of the request
 * @param end A  date object that represents the end of the request
 * @param type The type of request to make. Defaults to `point`.
 * @returns A list of paths  to request for the given packages
 */
const getRequestPaths = (
  packages: string[],
  start: DateComposite,
  end: DateComposite,
  type: 'point' | 'range' = 'point'
): string[] =>
  packages.map(
    (packageName) =>
      `/${type}/${start.year}-${start.month}-${start.day}:${end.year}-${end.month}-${end.day}/${packageName}`
  );

/**
 * Parses an object using the provided schema and throws an error if unable
 * to parse it or when the parsing/validation fails.
 *
 * @param options Options for parsing, includes the schema and the object
 * @returns The parsed object
 */
const parseObjectWithSchema = <SomeSchema extends ZodType>(
  options: ParseObjectOptions<SomeSchema>
): ParseObjectOutput<typeof options.schema> => {
  const { schema, object } = options;
  try {
    return schema.parse(object);
  } catch (err) {
    throw new Error(`Event is not valid.`, {
      cause: (err as ZodError).errors,
    });
  }
};

/**
 * Calculates the dates for the Monday and Sunday of the preceding week of a
 * given date.
 *
 * @param date A date object
 * @returns An object containing the start and end date of the preceding week
 */
const getPrecedingWeekStartEndDates = (
  date: Date
): PrecedingWeekStartEndDates => {
  // Get the Monday and Sunday of the preceding week
  const prevMonday = previousMonday(date);
  const prevSunday = previousSunday(date);

  return {
    start: {
      date: prevMonday,
      year: prevMonday.getFullYear(),
      month: prevMonday.getMonth() + 1,
      day: prevMonday.getDate(),
    },
    end: {
      date: prevSunday,
      year: prevSunday.getFullYear(),
      month: prevSunday.getMonth() + 1,
      day: prevSunday.getDate(),
    },
  };
};

export {
  getRequestPaths,
  parseObjectWithSchema,
  getPrecedingWeekStartEndDates,
};
