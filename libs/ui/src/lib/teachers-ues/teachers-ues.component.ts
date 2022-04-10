import { Component, OnInit } from '@angular/core';
import { UE } from '@prisma/client';
import { enseignementTeacherProps, TeachersService } from '../teachers.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ActivatedRoute } from '@angular/router';
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<enseignementTeacherProps> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<enseignementTeacherProps> | null | boolean;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  nzShowFilter?: boolean;
}
@Component({
  selector: 'teachers-archi-web-teachers-ues',
  templateUrl: './teachers-ues.component.html',
  styleUrls: ['./teachers-ues.component.scss'],
})
export class TeachersUesComponent implements OnInit {
  listOfColumns: ColumnItem[] = [];
  listOfData!: enseignementTeacherProps['Enseigne'];
  listOfDataFiltered!: enseignementTeacherProps['username'];
  constructor(
    public teachersService: TeachersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.teachersService.userValue?.id;
    this.getEnseignements(id || '');
  }

  getEnseignements(id: string) {
    const uesObs = this.teachersService.getAllEnseignementFromTeacher(id);
    uesObs.subscribe((enseignementData: enseignementTeacherProps) => {
      this.listOfData = enseignementData.Enseigne;
      this.listOfColumns = [
        {
          name: 'Intitule',
          sortOrder: null,
          sortFn: null,
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [],
          filterFn: null,
        },
        {
          name: 'CM',
          sortOrder: null,
          sortFn: null,
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [],
          filterFn: null,
        },
        {
          name: 'TP',

          sortOrder: null,
          sortFn: null,
          sortDirections: [null],
          filterMultiple: false,
          listOfFilter: [],
          filterFn: null,
          nzShowFilter: true,
        },

        {
          name: 'TD',
          sortOrder: null,
          sortFn: null,
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [],
          filterFn: null,
        },
      ];
    });
  }
}
