import { IRedashService, RedashService } from "./redash/redashService";
import { IQueryService, QueryService } from "./query/queryService";
import { ISheetService, SheetService } from "./sheet/sheetService";
import { ISheetConfigurationService, SheetConfigurationService } from "./sheet/sheetConfigurationService";
import { IRefreshSheetsUseCase, RefreshSheetsUseCase } from "./usecases/refreshSheetUseCase";

const redashService: IRedashService = new RedashService("API Key", "https://endpoint.com");
const queryService: IQueryService = new QueryService(redashService);
const sheetService: ISheetService = new SheetService();
const sheetConfigurationService: ISheetConfigurationService = new SheetConfigurationService("index");


const refreshSheetsUseCase: IRefreshSheetsUseCase = new RefreshSheetsUseCase(
  queryService,
  sheetService,
  sheetConfigurationService,
);


const refreshSheets = (): void => {
  refreshSheetsUseCase.execute();
}





