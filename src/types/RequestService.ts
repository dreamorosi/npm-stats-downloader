import type { BodyInit } from 'undici';
import type { NpmStatsClientConfig, RequestRetry } from './NpmStatsClient';

/**
 * List of HTTP methods that can be used in a request.
 */
type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

/**
 * Request options that can be used to customize the request.
 */
type RequestOptions = {
  path?: string;
  method?: HttpMethod;
  body?: BodyInit;
  queryParams?: Record<string, unknown>;
};

/**
 * Interface for a service that can make HTTP requests (it's simple).
 */
interface RequestService {
  request(options: RequestOptions): Promise<unknown>;
}

/**
 * Configs for the request service
 */
interface RequestServiceConfig
  extends Omit<NpmStatsClientConfig, 'customServices'> {
  /**
   * The configuration options for retrying a request if it fails.
   * By default, the request will be retried 3 times with a delay of 1 second before
   * throwing an error.
   */
  requestRetryConfig?: Omit<RequestRetry, 'count'>;
}

export { RequestService, RequestServiceConfig, RequestOptions, HttpMethod };
