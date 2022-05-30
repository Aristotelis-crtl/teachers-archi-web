import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeachersService, ueProps } from '../teachers.service';
import { Color, LegendPosition } from '@swimlane/ngx-charts';
import { User } from '@prisma/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

interface pieProps {
  name: string;
  value: number;
  extra: {
    value: string;
  };
}
@Component({
  selector: 'teachers-archi-web-teachers-admin-tdb',
  templateUrl: './admin-tdb.component.html',
  styleUrls: ['./admin-tdb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminTdbComponent implements OnInit {
  view = [700, 400];
  single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below' as LegendPosition;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  } as Color;

  constructor(
    public teachersService: TeachersService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}
  validateForm!: FormGroup;

  ues!: ueProps[];
  pieData!: pieProps[];
  usersLength?: number;
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.validateForm.valid) {
      const temp = this.validateForm.value;
      Object.keys(temp).forEach((key) => {
        if (temp[key] === null || temp[key] === undefined) {
          delete temp[key];
        }
      });
      this.teachersService.createUser(temp).subscribe(() => {
        this.isVisible = false;
      });
      this.message.info(
        `L'utilisateur ${temp.firstName} ${temp.lastName} a été ajouté`
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.teachersService.getCourses().subscribe((data: ueProps[]) => {
      this.ues = data;
      this.pieData = this.ues
        .map((ue) => {
          return {
            name: ue.intitule,
            value:
              (ue.groupesCM || 0) +
              (ue.groupesTD || 0) +
              (ue.groupesTP || 0) -
              (ue.Enseigne?.reduce(
                (x, acc) =>
                  x +
                  (acc.groupesCM || 0) +
                  (acc.groupesTP || 0) +
                  (acc.groupesTD || 0),
                0
              ) || 0),
            extra: { value: ue.id },
          };
        })
        .sort((a, b) => b.value - a.value);
    });
    this.teachersService
      .getTeachers()
      .subscribe((data: User[]) => (this.usersLength = data.length));
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      status: [null, [Validators.required]],
      minimumUC: [undefined],
    });
  }
}
