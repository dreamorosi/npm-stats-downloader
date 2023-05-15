/**
 * Utility type that allows to "see" inside another type.
 *
 * Wrap a type and hover on it to see its properties.
 * @example Prettify<MyType>
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
};

/**
 * Lambda payload for the weekly downloads function.
 *
 * Specify a list of packages and a date to get the weekly
 * downloads for the previous week. If no date is specified,
 * it will use the previous week from today.
 *
 * @example
 * {
 *   "packages": ["@aws-lambda-powertools/commons", "@aws-lambda-powertools/logger"]
 * }
 *
 * @example
 * {
 *   "packages": ["@aws-lambda-powertools/commons", "@aws-lambda-powertools/logger"]
 *   "date": "2021-02-01"
 * }
 */
type WeeklyDownloadsRequest = {
  /**
   * List of npm packages to get the weekly downloads for.
   * @example ["@aws-lambda-powertools/commons", "@aws-lambda-powertools/logger"]
   */
  packages: string[];
  /**
   * Date used to derive the weekly range. Note that it will
   * use the preceding week. If no date is specified, it will
   * use today.
   * @example "2021-02-01"
   */
  date?: string;
};

export { Prettify, WeeklyDownloadsRequest };
