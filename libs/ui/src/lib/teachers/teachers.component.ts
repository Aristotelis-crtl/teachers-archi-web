import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachersService } from '../teachers.service';
import { User } from '@prisma/client';
@Component({
  selector: 'teachers-archi-web-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  public teachersD: User[] | undefined;
  public user: any;
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    const teachersObs = this.teachersService.getTeachers();
    teachersObs.subscribe((userData: User[]) => {
      this.teachersD = userData;
    });
    const userObs = this.teachersService.login('dzqdzqdq', 'password');
    userObs.subscribe(() => {
      console.log('hello');
    });
  }

  public create() {
    /* return this.teachersService.createUser({firstName: 'jacqueees', lastName: "moule"}).subscribe(response => {
      console.log(response);
    }); */
    if (this.teachersD) {
      console.log(
        'teachd',
        this.teachersD[0].username,
        this.teachersD[0].password
      );

      this.teachersService.login(
        this.teachersD[0].username,
        this.teachersD[0].password
      );
    }
    this.user = this.teachersService.userValue;
    this.teachersService.getTeachers();

    console.log('this.user', this.user);
  }
}
