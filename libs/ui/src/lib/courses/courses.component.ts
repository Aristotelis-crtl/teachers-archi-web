import { Component, OnInit } from '@angular/core';
import { UE } from '@prisma/client';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'teachers-archi-web-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public ues!: UE[];
  public uesFormatted: any;
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    const uesObs = this.teachersService.getCourses();
    uesObs.subscribe((uesData: UE[]) => {
      this.ues = uesData;
    });
    // this.uesFormatted = this.ues ?this.ues?.map((ue, i) => {}) : []
  }
}
