import { Component, OnInit } from '@angular/core';
import { enseignementTeacherProps, TeachersService } from '../teachers.service';

import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Enseigne, Rules } from '@prisma/client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'teachers-archi-web-teachers-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  editMode = false;
  rules!: Rules;
  validateForm!: FormGroup;

  constructor(
    public teachersService: TeachersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRules();
    this.validateForm = this.fb.group({
      td: [undefined],
      tp: [undefined],
      cm: [undefined],
      aterRule: [undefined],
    });
  }

  getRules() {
    const rulesObs = this.teachersService.getRules();
    rulesObs.subscribe((rulesData: Rules) => {
      this.rules = rulesData;
    });
  }

  enableEdit(): void {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    if (this.validateForm.valid) {
      const temp = this.validateForm.value;
      Object.keys(temp).forEach((key) => {
        if (temp[key] === null || temp[key] === undefined) {
          delete temp[key];
        }
      });
      this.teachersService
        .updateRules(temp, this.rules.id)
        .subscribe((data: Rules) => {
          this.editMode = false;
          this.rules = data;
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
