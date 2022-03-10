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
  public $teachersD: User[] | undefined
  constructor(public teachersService: TeachersService) { }

  ngOnInit(): void {
    this.$teachers = this.teachersService.getTeachers()
  }

  public create() {
    return this.teachersService.createUser({firstName: 'jacqueees', lastName: "moule"}).subscribe(response => {
      console.log(response);
    });
  }

}
