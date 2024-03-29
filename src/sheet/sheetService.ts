export interface ISheetService {
  updateValues(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    values: (string | number)[][],
    keyColumnIndex?: number,
  ): void;
}

export class SheetService implements ISheetService {
  // check if the sheet is empty
  private isSheetEmpty(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const data = sheet.getDataRange().getValues();
    // データが空かどうかをチェック
    if (data.length == 1 && data[0].length == 1 && data[0][0] === "") {
      return true;
    } else {
      return false;
    }
  }

  // Update or append values in a given sheet. Rows are identified by a key in a specified column.
  public updateValues(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    values: (string | number)[][],
    keyColumnIndex = 1,
  ) {
    const lastRowIndex = sheet.getLastRow() < 1 ? 1 : sheet.getLastRow();
    const lastColumnIndex =
      sheet.getLastColumn() < 1 ? 1 : sheet.getLastColumn();
    const keyValues = sheet
      .getRange(1, keyColumnIndex, lastRowIndex)
      .getValues();
    const sheetValues = this.isSheetEmpty(sheet)
      ? []
      : sheet.getRange(1, 1, lastRowIndex, lastColumnIndex).getValues();

    const keyIndexMap = new Map();
    keyValues.forEach((keyValue, index) => {
      keyIndexMap.set(`${keyValue[0]}`, index);
    });

    values.forEach((value) => {
      const key = `${value[keyColumnIndex - 1]}`;
      const index = keyIndexMap.get(key);
      if (index != undefined) {
        sheetValues[index] = value;
      } else {
        sheetValues.push(value);
      }
    });

    const range = sheet.getRange(
      1,
      1,
      sheetValues.length,
      sheetValues[0].length,
    );
    range.setValues(sheetValues);
  }
}
