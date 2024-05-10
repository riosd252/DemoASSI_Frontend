import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';
import { Table, assignTable } from 'src/app/interfaces/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Occupant } from 'src/app/interfaces/occupant';

@Component({
  selector: 'app-arriving',
  templateUrl: './arriving.component.html',
  styleUrls: ['./arriving.component.scss'],
})
export class ArrivingComponent implements OnInit {
  availableTables: Table[] = [];
  arrivingOccupants: FormGroup;
  singleTableSolution: Table | undefined;
  multiTableSolution: Table[] | undefined;

  constructor(
    private tablesSrv: TablesService,
    private formBuilder: FormBuilder
  ) {
    this.arrivingOccupants = this.formBuilder.group({
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tablesSrv.getAvailableTables().subscribe((tables: Table[]) => {
      this.availableTables = tables;
    });
  }

  searchSolution() {
    this.singleTableSolution = undefined;
    this.multiTableSolution = undefined;

    let tableOrTables: Table | Table[] = assignTable(
      this.arrivingOccupants.get('quantity')?.value,
      this.availableTables
    );

    if (tableOrTables instanceof Array) {
      this.multiTableSolution = tableOrTables;
    } else {
      this.singleTableSolution = tableOrTables;
    }
  }

  confirmSolution(arrivingOccupants: number, table?: Table, tables?: Table[]) {
    let occupants: Occupant = { occupants: arrivingOccupants };
    if (table) {
      this.tablesSrv
        .addOccupants(table.id, occupants)
        .subscribe((resp) => window.location.reload());
    } else if (tables) {
      let peopleLeft = arrivingOccupants;

      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        if (peopleLeft > 0 && table.freeSeats > 0) {
          let occupantsCount = Math.min(peopleLeft, table.freeSeats);
          let occupants: Occupant = { occupants: occupantsCount };
          this.tablesSrv.addOccupants(table.id, occupants).subscribe();
          peopleLeft -= occupantsCount;
        }
      }
    }
    window.location.reload();
  }
}
