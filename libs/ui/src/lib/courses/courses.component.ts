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
  public uesFormatted: any;
  constructor(public teachersService: TeachersService) {}
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  ngOnInit(): void {
    const uesObs = this.teachersService.getCourses();
    uesObs.subscribe((uesData: UE[]) => {
      this.ues = uesData;
    });
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    this.listOfData = data;
    this.updateEditCache();
  }
  // this.uesFormatted = this.ues ?this.ues?.map((ue, i) => {}) : []
}
