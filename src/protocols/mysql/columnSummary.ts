export class ColumnSummary {
  private _columnName!: string;
  private _columnType!: string;
  private _columnConstraints: string[] = [];

  get columnName() {
    return this._columnName;
  }
  set columnName(value: string) {
    this._columnName = value;
  }
  get columnType() {
    return this._columnType;
  }
  set columnType(value: string) {
    this.columnType = value;
  }
  get columnConstraints() {
    return this._columnConstraints;
  }
  set columnConstraints(value: string[]) {
    this._columnConstraints = value;
  }
}
