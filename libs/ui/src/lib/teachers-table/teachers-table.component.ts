import { Component, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { TeachersService } from '../teachers.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<User[]> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<User[]> | null | boolean;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  nzShowFilter?: boolean;
  nzAlign?: 'center';
}
@Component({
  selector: 'teachers-archi-web-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent implements OnInit {
  listOfColumns: ColumnItem[] = [];
  listOfData: User[] = [];

  constructor(
    public teachersService: TeachersService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getTeachers();
    this.listOfColumns = [
      {
        name: 'Nom utilisateur',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
      },
      {
        name: 'Prénom',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
      },
      {
        name: 'Nom',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
      },
      {
        name: 'Status',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
      },
      {
        name: 'Minimum UC',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
      },
      {
        name: 'Actions',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        filterMultiple: false,
        listOfFilter: [],
        filterFn: null,
        nzShowFilter: true,
        nzAlign: 'center',
      },
    ];
  }

  getTeachers() {
    const teachersObs = this.teachersService.getTeachers();
    teachersObs.subscribe((userData: User[]) => {
      this.listOfData = userData;
    });
  }
  cancel(): void {
    this.message.info('click cancel');
  }

  confirm(id: string): void {
    this.teachersService
      .removeTeacher(id)
      .subscribe((data: User) =>
        this.message.info(`L'utilisateur ${data.username} a été supprimé`)
      );
  }
}
