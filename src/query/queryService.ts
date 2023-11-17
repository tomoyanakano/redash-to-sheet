import { IRedashService } from "../redash/redashService";

export interface IQueryService {
  refreshQuery(queryId: string, params?: string): Promise<any>;
  fetchJob(jobId: string): Promise<any>;
  pollingJob(jobId: string): Promise<any>;
  fetchQueryResult(queryResultId: string): Promise<any>;
  fetchQuery(queryId: string, params?: string): Promise<any>;
}

export class QueryService implements IQueryService {
  constructor(private redashService: IRedashService) {}

  // Refreshes a query
  async refreshQuery(queryId: string, params: string = ""): Promise<any> {
    const response = await this.redashService.request("post", `/api/queries/${queryId}/refresh?${params}`);
    return JSON.parse(response);
  }

  // Fetches a job status
  async fetchJob(jobId: string): Promise<any> {
    const response = await this.redashService.request("get", `/api/jobs/${jobId}`);
    return JSON.parse(response).job;
  }

  // Polls a job until it's completed
  async pollingJob(jobId: string): Promise<any> {
    let job = await this.fetchJob(jobId);
    while (job.status !== 3) {
      if (job.status === 4) {
        throw new Error(`Job failed: ${JSON.stringify(job)}`);
      }
      Utilities.sleep(1000);
      job = await this.fetchJob(job.id);
    }
    return job;
  }

  // Fetches the result of a query
  async fetchQueryResult(queryResultId: string): Promise<any> {
    const response = await this.redashService.request("get", `/api/query_results/${queryResultId}.csv`);
    return Utilities.parseCsv(response);
  }

  // Fetches a query and returns its result
  async fetchQuery(queryId: string, params: string = ""): Promise<any> {
    const response = await this.refreshQuery(queryId, params);
    const job = await this.pollingJob(response.job.id);
    return this.fetchQueryResult(job.query_result_id);
  }
}
