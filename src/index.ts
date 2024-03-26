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

const API_KEY =
  PropertiesService.getScriptProperties().getProperty("API_KEY") || "";
const REDASH_HOST =
  PropertiesService.getScriptProperties().getProperty("REDASH_HOST") || "";
const CONFING_SHEET_NAME =
  PropertiesService.getScriptProperties().getProperty("CONFIG_SHEET_NAME") ||
  "config";

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

const refreshQueries = (): void => {
  refreshSheetsUseCase.execute({ isAll: false });
};

const refreshAllQueries = (): void => {
  refreshSheetsUseCase.execute({ isAll: true });
};
