import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModifiedTable, Table } from '../interfaces/table';
import { Occupant } from '../interfaces/occupant';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private backendAddress: string = environment.backendAddress;

  constructor(private http: HttpClient) {}

  public getAllTables() {
    return this.http.get<Table[]>(`${this.backendAddress}/tables`);
  }

  public getAvailableTables() {
    return this.http.get<Table[]>(`${this.backendAddress}/tables/freeTables`);
  }

  public getOccupiedTables() {
    return this.http.get<Table[]>(
      `${this.backendAddress}/tables/occupiedTables`
    );
  }

  public getTableById(tableId: number) {
    return this.http.get<Table>(`${this.backendAddress}/tables/${tableId}`);
  }

  public saveTable(newTable: ModifiedTable) {
    return this.http.post<ModifiedTable>(
      `${this.backendAddress}/tables`,
      newTable
    );
  }

  public modifyTable(tableId: number, modifiedTable: ModifiedTable) {
    return this.http.post<ModifiedTable>(
      `${this.backendAddress}/tables/${tableId}`,
      modifiedTable
    );
  }

  public deleteTable(tableId: number) {
    return this.http.delete(`${this.backendAddress}/tables/${tableId}`);
  }

  public addOccupants(tableId: number, occupants: Occupant) {
    return this.http.post<Occupant>(
      `${this.backendAddress}/tables/${tableId}/arriving`,
      occupants
    );
  }

  public removeOccupants(tableId: number, occupants: Occupant) {
    return this.http.post<Occupant>(
      `${this.backendAddress}/tables/${tableId}/departing`,
      occupants
    );
  }
}
