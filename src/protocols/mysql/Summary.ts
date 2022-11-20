export class Summary {
  private _databaseName!: string;
  private _tables!: string[];
  get databaseName() {
    return this._databaseName;
  }
  set databaseName(value: string) {
    this._databaseName = value;
  }
  get tables() {
    return this._tables;
  }
  set tables(value: string[]) {
    this._tables = value;
  }
}
