import { IRedashService, RedashService } from "./redash/redashService";
import { IQueryService, QueryService } from "./query/queryService";

const apiService: IRedashService = new RedashService("APIキー", "https://endpoint.com");
const queryService: IQueryService = new QueryService(apiService);


