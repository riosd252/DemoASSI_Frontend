import { Component, OnInit, TemplateRef } from '@angular/core';
import { Table } from 'src/app/interfaces/table';
import { TablesService } from 'src/app/services/tables.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableSrv: TablesService, private modalSrv: NgbModal) {}

  ngOnInit(): void {
    this.tableSrv.getAllTables().subscribe((tables: Table[]) => {
      this.tables = tables;
    });
  }

  openModal(content: any) {
    this.modalSrv.open(content, { size: 'lg' });
  }
}
