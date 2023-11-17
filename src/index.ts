import { IRedashService, RedashService } from "./redash/redashService";
import { IQueryService, QueryService } from "./query/queryService";
import { ISheetService, SheetService } from "./sheet/sheetService";
import {
  ISheetConfigurationService,
  SheetConfigurationService,
} from "./sheet/sheetConfigurationService";
import {
  IRefreshSheetsUseCase,
  RefreshSheetsUseCase,
} from "./usecases/refreshSheetUseCase";

const API_KEY = "";
const REDASH_HOST = "";
const CONFING_SHEET_NAME = "";

const redashService: IRedashService = new RedashService(API_KEY, REDASH_HOST);
const queryService: IQueryService = new QueryService(redashService);
const sheetService: ISheetService = new SheetService();
const sheetConfigurationService: ISheetConfigurationService =
  new SheetConfigurationService(CONFING_SHEET_NAME);

const refreshSheetsUseCase: IRefreshSheetsUseCase = new RefreshSheetsUseCase(
  queryService,
  sheetService,
  sheetConfigurationService,
);

const main = (): void => {
  refreshSheetsUseCase.execute();
};
