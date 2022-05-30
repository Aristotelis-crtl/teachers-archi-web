import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@prisma/client';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TeachersService } from '../teachers.service';

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
@Component({
  selector: 'teachers-archi-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: User | null;
  validateForm!: FormGroup;

  public isLoggedIn = false;
  public isVisible = false;
  public wrongPassword = false;

  constructor(
    public teachersService: TeachersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.teachersService.userValue;
    this.isLoggedIn = this.user === null ? false : true;
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  public logout() {
    this.teachersService.logout();
    this.isLoggedIn = false;
  }

  showModal() {
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }

  onSubmit() {
    if (this.validateForm.valid) {
      this.teachersService
        .login(
          this.validateForm.value.userName,
          this.validateForm.value.password
        )
        .subscribe(() => {
          this.teachersService.userValue
            ? (this.isLoggedIn = true)
            : (this.isLoggedIn = false);
          this.teachersService.userValue
            ? (this.isVisible = false)
            : (this.isVisible = true);
          !this.teachersService.userValue ? (this.wrongPassword = true) : 0;
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
