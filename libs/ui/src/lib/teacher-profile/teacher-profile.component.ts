import { Component, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'teachers-archi-web-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  public user!: User | null;
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    this.user = this.teachersService.userValue;
  }
}
