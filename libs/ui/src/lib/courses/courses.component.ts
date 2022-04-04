import { Component, OnInit } from '@angular/core';
import { UE } from '@prisma/client';
import { TeachersService } from '../teachers.service';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'teachers-archi-web-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  listOfData: ItemData[] = [];
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  public ues: UE[] = [];
  constructor(public teachersService: TeachersService) {}

  ngOnInit(): void {
    const uesObs = this.teachersService.getCourses();
    uesObs.subscribe((uesData: UE[]) => {
      this.ues = uesData;
    });
  }
  // this.uesFormatted = this.ues ?this.ues?.map((ue, i) => {}) : []
}
