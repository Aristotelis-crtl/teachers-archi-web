import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UE, User } from '@prisma/client';
import {
  enseignementTeacherProps,
  TeachersService,
  ueProps,
} from '../teachers.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
interface SelectProps {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'teachers-archi-web-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeachersTableComponent implements OnInit {
  //Table var
  listOfColumns: ColumnItem[] = [];
  listOfData: enseignementTeacherProps[] = [];
  expandSet = new Set<string>();

  //Modal var
  isVisible = false;
  userChosen!: enseignementTeacherProps | undefined;
  listUes!: ueProps[];
  listOfGroupOption: SelectProps[] = [];
  listOfGroupOptionFiltered: SelectProps[] = [];
  nbCMRestant = 0;
  nbTDRestant = 0;
  nbTPRestant = 0;
  ueSelectedId!: string;
  ueSelected!: UE | undefined;
  validateForm!: FormGroup;

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  constructor(
    public teachersService: TeachersService,
    private message: NzMessageService,
    private fb: FormBuilder
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
    this.validateForm = this.fb.group({
      ue: [null, { disabled: true }, [Validators.required]],
      CM: [null, { disabled: true }, [Validators.required]],
      TD: [null, { disabled: true }, [Validators.required]],
      TP: [null, { disabled: true }, [Validators.required]],
    });
  }

  getTeachers() {
    const teachersObs = this.teachersService.getTeachers();
    teachersObs.subscribe((userData: enseignementTeacherProps[]) => {
      this.listOfData = userData;
      this.listOfData = userData.map((u) => ({ ...u, expand: false }));
    });
  }
  cancel(): void {
    this.message.info('Suppresion annulé');
  }

  showAddModal(id: string) {
    this.isVisible = true;
    this.userChosen = this.listOfData.find((u) => u.id === id);
    const idEnseigne = this.userChosen?.Enseigne.map(
      (enseigne) => enseigne.ue.intitule
    );
    this.teachersService.getCourses().subscribe((data: ueProps[]) => {
      this.listUes = data;
      this.listOfGroupOption = this.listUes
        .filter((ue) => !idEnseigne?.includes(ue.intitule))
        .map((ue) => ({
          label: ue.intitule,
          value: ue.intitule,
        }));
    });
  }
  onSubmit(): void {
    Object.values(this.validateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      } else {
        const formData = this.validateForm.value;
        const nbGroupeCM =
          formData.CM === null || formData.CM === '' ? null : formData.CM;
        const nbGroupeTP =
          formData.TP === null || formData.TP === '' ? null : formData.TP;
        const nbGroupeTD =
          formData.TD === null || formData.TD === '' ? null : formData.TD;

        this.isVisible &&
          this.teachersService
            .addEnseignement(
              this.userChosen?.id || '',
              this.ueSelected?.id || '',
              '',
              this.userChosen?.status || 'VAC',
              this.ueSelected?.heuresCM || 0,
              this.ueSelected?.heuresTD || 0,
              this.ueSelected?.heuresTP || 0,
              nbGroupeCM === null ? 0 : nbGroupeCM,
              nbGroupeTD === null ? 0 : nbGroupeTD,
              nbGroupeTP === null ? 0 : nbGroupeTP
            )
            .subscribe(() => {
              this.getTeachers();
            });

        this.isVisible = false;
        this.validateForm.reset();
      }
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  confirm(id: string): void {
    this.teachersService.removeTeacher(id).subscribe((data: User) => {
      this.message.info(`L'utilisateur ${data.username} a été supprimé`);
      this.listOfData = this.listOfData.filter((item) => item.id !== data.id);
    });
  }

  confirmDelete(id: string): void {
    this.teachersService.removeEnseignement(id).subscribe(() => {
      this.message.info(`L'enseignant a été désinscrit`);
      this.getTeachers();
    });
  }

  search(value: string): void {
    this.listOfGroupOptionFiltered = this.listOfGroupOption.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );
  }
  updateInputs(value: string | undefined) {
    this.ueSelectedId = value ? value : '';
    this.ueSelected = this.listUes.find((ue) => ue.intitule === value);
    const ue = this.listUes.find((ue) => ue.intitule === this.ueSelectedId);
    this.nbCMRestant =
      (ue?.groupesCM || 0) -
      (ue?.Enseigne?.reduce((x, acc) => x + (acc.groupesCM || 0), 0) || 0);
    this.nbTDRestant =
      (ue?.groupesTD || 0) -
      (ue?.Enseigne?.reduce((x, acc) => x + (acc.groupesTD || 0), 0) || 0);
    this.nbTPRestant =
      (ue?.groupesTP || 0) -
      (ue?.Enseigne?.reduce((x, acc) => x + (acc.groupesTP || 0), 0) || 0);
  }
}
