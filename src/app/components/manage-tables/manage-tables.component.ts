import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/interfaces/table';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss'],
})
export class ManageTablesComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableSrv: TablesService) {}

  ngOnInit(): void {
    this.tableSrv.getAllTables().subscribe((tables: Table[]) => {
      this.tables = tables;
    });
  }
}
