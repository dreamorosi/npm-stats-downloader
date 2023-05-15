import { RequestService } from './RequestService';

/**
 * The configuration options for the NpmStatsClient
 */
type NpmStatsClientConfig = {
  /**
   * The hostname to use for all requests
   * @default 'api.npmjs.org'
   */
  hostname?: string;
  /**
   * The basePath to use for all requests
   * @default '/downloads'
   */
  basePath?: string;
  /**
   * The protocol to use for all requests
   * @default 'https'
   */
  protocol?: 'http' | 'https';
  /**
   * Options for customizing the services used by the API client.
   * This is useful for testing as it allows you to mock the services.
   */
  customServices?: {
    /**
     * The request service which is used to make requests to the
     * API endpoint
     * @default new RequestService()
     */
    requestService?: RequestService;
  };
};

/**
 * The configuration options for retrying a request if it fails
 */
type RequestRetry = {
  /**
   * The number of times a request has been retried
   */
  count: number;
  /**
   * The delay in milliseconds to wait before retrying a request
   */
  delay: number;
  /**
   * The number of times to retry a request
   */
  maxRetries: number;
};

export { NpmStatsClientConfig, RequestRetry };
