import { RequestService } from './RequestService';
import {
  parseObjectWithSchema,
  getRequestPaths,
  getPrecedingWeekStartEndDates,
} from './utils';
import { NpmAPIPointResponseSchema } from './schemas/NpmAPIPointResponse';
import type { RequestService as IRequestService } from './types/RequestService';
import type { NpmStatsClientConfig } from './types/NpmStatsClient';
import type {
  NpmAPIPointResponse,
  WeeklyDownloadsRequestParsed,
} from './types/utils';

class NpmStatsClient {
  /**
   * The request service which is used to make requests to the API   *
   * @default new RequestService()
   */
  #requestService: IRequestService;

  public constructor(config?: NpmStatsClientConfig) {
    this.#requestService =
      config?.customServices?.requestService || new RequestService(config);
  }

  public async getWeeklyDownloadsStats({
    packages,
    date,
  }: WeeklyDownloadsRequestParsed): Promise<NpmAPIPointResponse[]> {
    const { start, end } = getPrecedingWeekStartEndDates(date);

    try {
      const responses = await Promise.all(
        getRequestPaths(packages, start, end).map((path) =>
          this.#requestService.request({ path })
        )
      );
      const parsedResponses = responses.map((response) =>
        parseObjectWithSchema({
          schema: NpmAPIPointResponseSchema,
          object: response,
        })
      );

      return parsedResponses;
    } catch (err) {
      throw new Error('Unable to get weekly downloads stats from the npm API', {
        cause: err,
      });
    }
  }
}

export { NpmStatsClient };
