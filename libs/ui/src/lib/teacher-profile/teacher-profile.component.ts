import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@prisma/client';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'teachers-archi-web-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  public user!: User | null;
  validateForm!: FormGroup;
  editMode = false;

  constructor(
    public teachersService: TeachersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.teachersService.userValue;
    this.validateForm = this.fb.group({
      username: [undefined],
      password: [undefined],
      firstName: [undefined],
      lastName: [undefined],
      minimumUC: [undefined],
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
        .updateUser(temp, this.user?.id || '')
        .subscribe((data: User) => {
          this.editMode = false;
          this.user = data;
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
