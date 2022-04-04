import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UE } from '@prisma/client';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'teachers-archi-web-courses-details-id',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent implements OnInit {
  public ue: UE | null = null;
  constructor(
    public teachersService: TeachersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.teachersService.getCourse(id).subscribe((ue: UE) => (this.ue = ue));
  }
}
