import { Component, OnInit } from '@angular/core';
import { Enseigne, UE } from '@prisma/client';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { TeachersService } from '../teachers.service';

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
  selector: 'teachers-archi-web-ues-restantes',
  templateUrl: './ues-restantes.component.html',
  styleUrls: ['./ues-restantes.component.scss'],
})
export class UesRestantesComponent implements OnInit {
  listOfColumns: ColumnItem[] = [];
  listOfData: ueProps[] = [];

  getUes() {
    const uesObs = this.teachersService.getCourses();
    uesObs.subscribe((uesData: ueProps[]) => {
      this.listOfData = uesData;
      this.listOfData = this.listOfData.filter(
        (ue) =>
          ue.groupesCM !==
            ue.Enseigne?.reduce((x, acc) => x + (acc.groupesCM || 0), 0) ||
          ue.groupesTD !==
            ue.Enseigne?.reduce((x, acc) => x + (acc.groupesTD || 0), 0) ||
          ue.groupesTD !==
            ue.Enseigne?.reduce((x, acc) => x + (acc.groupesTD || 0), 0)
      );
      this.listOfColumns = [
        {
          name: 'Intitule',
          sortOrder: null,
          sortFn: (a: ueProps, b: ueProps) =>
            a.intitule.localeCompare(b.intitule),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: false,
          listOfFilter: [],
          filterFn: null,
          nzShowFilter: true,
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
          nzShowFilter: true,
        },
      ];
    });
  }
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    this.getUes();
  }
}
