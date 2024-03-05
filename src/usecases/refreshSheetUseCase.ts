import { IQueryService } from "../query/queryService";
import { ISheetService } from "../sheet/sheetService";
import { ISheetConfigurationService } from "../sheet/sheetConfigurationService";

export interface IRefreshSheetsUseCase {
  execute({ isAll }: { isAll: boolean }): Promise<void>;
}

export class RefreshSheetsUseCase implements IRefreshSheetsUseCase {
  private queryService: IQueryService;
  private sheetService: ISheetService;
  private sheetConfigurationService: ISheetConfigurationService;

  constructor(
    queryService: IQueryService,
    sheetService: ISheetService,
    sheetConfigurationService: ISheetConfigurationService,
  ) {
    this.queryService = queryService;
    this.sheetService = sheetService;
    this.sheetConfigurationService = sheetConfigurationService;
  }

  // Executes the use case to refresh data in sheets based on configurations
  public async execute({ isAll }: { isAll?: boolean }): Promise<void> {
    const sheetConfigs =
      this.sheetConfigurationService.getSheetConfigurations();

    for (const config of sheetConfigs) {
      try {
        if (!config.isEnabled && !isAll) {
          continue;
        }
        // Retrieve the query result
        const queryResult = await this.queryService.fetchQuery(config.queryId);
        // Find the target sheet to update
        const targetSheet =
          SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
            config.sheetName,
          );

        if (targetSheet) {
          // Update values in the target sheet
          this.sheetService.updateValues(
            targetSheet,
            queryResult,
            config.keyColumnIndex,
          );
        } else {
          console.error(`Sheet not found: ${config.sheetName}`);
        }
      } catch (error) {
        console.error(`Error updating sheet: ${config.sheetName}`, error);
      }
    }
  }
}
