import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() table!: Table;

  constructor() {}

  ngOnInit(): void {}

  generateChairsAndTables(): number[] {
    return Array(this.table.capacity / 2).fill(0);
  }
}
