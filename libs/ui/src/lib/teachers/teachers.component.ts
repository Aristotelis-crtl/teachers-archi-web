import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers.service';
import {User} from '@prisma/client'
@Component({
  selector: 'teachers-archi-web-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  public $teachers!: Observable<User[]>;
  constructor(public teachersService: TeachersService) { }

  ngOnInit(): void {
    this.$teachers = this.teachersService.getTeachers();
  }

}
