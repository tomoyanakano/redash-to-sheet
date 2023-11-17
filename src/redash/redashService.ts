export interface IRedashService {
  request(
    method: GoogleAppsScript.URL_Fetch.HttpMethod,
    endpoint: string,
  ): Promise<string>;
}

export class RedashService implements IRedashService {
  constructor(
    private apiKey: string,
    private host: string,
  ) {}

  async request(
    method: GoogleAppsScript.URL_Fetch.HttpMethod,
    endpoint: string,
  ): Promise<string> {
    const url = `${this.host}${endpoint}`;
    const response = UrlFetchApp.fetch(url, {
      method: method,
      muteHttpExceptions: true,
      headers: {
        Authorization: `Key ${this.apiKey}`,
      },
    });
    return response.getContentText();
  }
}
