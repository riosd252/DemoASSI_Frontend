import { Component, Input, OnInit } from '@angular/core';
import { Table, ModifiedTable } from 'src/app/interfaces/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TablesService } from 'src/app/services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit {
  isCollapsed: boolean = true;
  @Input() table: Table | null = null;
  tableForm!: FormGroup;
  constructor(private tableSrv: TablesService, private router: Router) {}

  ngOnInit(): void {
    if (this.table) {
      this.tableForm = new FormGroup({
        tableNumber: new FormControl(
          this.table.tableNumber,
          Validators.required
        ),
        capacity: new FormControl(this.table.capacity, Validators.required),
      });
    } else {
      this.tableForm = new FormGroup({
        tableNumber: new FormControl('', Validators.required),
        capacity: new FormControl('', Validators.required),
      });
    }
  }

  saveTable() {
    let newTable: ModifiedTable = {
      tableNum: this.tableForm.get('tableNumber')!.value!,
      capacity: Number(this.tableForm.get('capacity')!.value!),
    };
    this.tableSrv.saveTable(newTable).subscribe((resp) => {
      alert('New table saved.');
      this.router.navigate(['home']);
    });
  }

  modifyTable(tableId: number) {
    let modifiedTable: ModifiedTable = {
      tableNum: this.tableForm.get('tableNumber')!.value!,
      capacity: Number(this.tableForm.get('capacity')!.value!),
    };
    this.tableSrv.modifyTable(tableId, modifiedTable).subscribe((resp) => {
      alert('The table was successfully modified.');
      this.router.navigate(['home']);
    });
  }

  deleteTable(tableId: number) {
    this.tableSrv.deleteTable(tableId).subscribe((resp) => {
      alert('Table deleted.');
      this.router.navigate(['home']);
    });
  }
}
