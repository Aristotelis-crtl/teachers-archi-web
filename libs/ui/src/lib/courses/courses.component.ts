import { Component, OnInit } from '@angular/core';
import { Enseigne, UE } from '@prisma/client';
import { TeachersService } from '../teachers.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

interface ueProps extends UE {
  Enseigne?: Enseigne[];
}
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ueProps> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ueProps> | null | boolean;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  nzShowFilter?: boolean;
}
@Component({
  selector: 'teachers-archi-web-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  listOfColumns: ColumnItem[] = [];
  listOfData: UE[] = [];
  listOfDataFiltered: UE[] = [];
  public ues: UE[] = [];
  filterName!: string;
  expandSet = new Set<string>();
  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  updateFilter() {
    this.filterName = (<HTMLInputElement>(
      document.getElementById('filterName')
    )).value;
    this.filterName !== ''
      ? (this.listOfDataFiltered = this.listOfData.filter((data) =>
          data.intitule.toLowerCase().includes(this.filterName.toLowerCase())
        ))
      : (this.listOfDataFiltered = this.listOfData);
  }
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    this.getUes();
  }

  getUes() {
    const uesObs = this.teachersService.getCourses();
    uesObs.subscribe((uesData: UE[]) => {
      this.listOfData = uesData;
      this.listOfDataFiltered = this.listOfData;
      this.listOfColumns = [
        {
          name: 'Intitule',
          sortOrder: null,
          sortFn: (a: ueProps, b: ueProps) =>
            a.intitule.localeCompare(b.intitule),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [],
          filterFn: (list: string[], item: ueProps) =>
            list.some((name) => item.intitule.indexOf(name) !== -1),
        },
        {
          name: 'Parcours',
          sortOrder: null,
          sortFn: (a: ueProps, b: ueProps) =>
            a.intitule.localeCompare(b.intitule),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: false,
          listOfFilter: [
            { text: 'Licence', value: 'Licence' },
            { text: 'Master Miage', value: 'Master Miage' },
            { text: 'Master Info', value: 'Master Info' },
          ],
          filterFn: (address: string, item: UE) =>
            item.formation.indexOf(address) !== -1,
        },
        {
          name: 'Obligatoire',
          sortOrder: null,
          sortFn: (a: ueProps, b: ueProps) => a.status.localeCompare(b.status),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [],
          filterFn: (list: string[], item: ueProps) =>
            list.some((name) => item.intitule.indexOf(name) !== -1),
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
        },
      ];
    });
  }
  // this.uesFormatted = this.ues ?this.ues?.map((ue, i) => {}) : []
}
