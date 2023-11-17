export interface IConfiguration {
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
        sheetName: row[0],
        queryId: row[1],
        keyColumnIndex: row[2],
      });
    }

    return configurations;
  }
}
