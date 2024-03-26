export interface IConfiguration {
  isEnabled: boolean;
  sheetName: string;
  queryId: string;
  keyColumnIndex: number;
}

export interface ISheetConfigurationService {
  getSheetConfigurations(): IConfiguration[];
}

export class SheetConfigurationService implements ISheetConfigurationService {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;
  constructor(sheetName: string) {
    this.sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)!;
  }

  // Get configurations from a sheet.
  public getSheetConfigurations(): IConfiguration[] {
    const configurations: IConfiguration[] = [];
    const dataRange = this.sheet.getDataRange();
    const values = dataRange.getValues();

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      configurations.push({
        isEnabled: row[0],
        sheetName: row[1],
        queryId: row[2],
        keyColumnIndex: row[3],
      });
    }

    return configurations;
  }
}
