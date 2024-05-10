import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Table } from 'src/app/interfaces/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Occupant } from 'src/app/interfaces/occupant';

@Component({
  selector: 'app-departing',
  templateUrl: './departing.component.html',
  styleUrls: ['./departing.component.scss'],
})
export class DepartingComponent implements OnInit {
  occupiedTables: Table[] = [];
  selectedTable: Table | undefined;
  departingOccupants: FormGroup;
  constructor(
    private tableSrv: TablesService,
    private formBuilder: FormBuilder
  ) {
    this.departingOccupants = this.formBuilder.group({
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tableSrv.getOccupiedTables().subscribe((tables: Table[]) => {
      this.occupiedTables = tables;
    });
  }

  confirmDeparture(departingOccupants: number, table: Table) {
    let occupants: Occupant = { occupants: departingOccupants };
    this.tableSrv
      .removeOccupants(table.id, occupants)
      .subscribe((resp) => window.location.reload());
  }
}
