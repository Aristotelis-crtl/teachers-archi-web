import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enseigne, UE } from '@prisma/client';
import { Subject } from 'rxjs';
import { TeachersService } from '../teachers.service';

interface ueProps extends UE {
  Enseigne?: Enseigne[];
}
@Component({
  selector: 'teachers-archi-web-courses-details-id',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent implements OnInit {
  public ue: ueProps | null = null;
  public enseigne: Enseigne | null = null;
  //handle numbers of courses avaible
  public nbCMRestant: number | undefined | null = 0;
  public nbTPRestant: number | undefined | null = 0;
  public nbTDRestant: number | undefined | null = 0;
  disabledTD = false;
  disabledTP = false;
  disabledCM = false;

  private _isDead$ = new Subject();

  //public userId = ''
  validateForm!: FormGroup;
  isVisible = false;
  constructor(
    public teachersService: TeachersService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.getCourse();
    const id = this.route.snapshot.paramMap.get('id') || '';
    const obs = this.teachersService.getCourse(id);
    obs.subscribe({
      next: (x) => {
        this.ue = x;
        this.nbCMRestant =
          (x.groupesCM || 0) -
          (x.Enseigne?.reduce((x, acc) => x + (acc.groupesCM || 0), 0) || 0);
        this.nbTDRestant =
          (x.groupesTD || 0) -
          (x.Enseigne?.reduce((x, acc) => x + (acc.groupesTD || 0), 0) || 0);
        this.nbTPRestant =
          (x.groupesTP || 0) -
          (x.Enseigne?.reduce((x, acc) => x + (acc.groupesTP || 0), 0) || 0);
        this.disabledCM = this.nbCMRestant <= 0;
        this.disabledTD = this.nbTDRestant <= 0;
        this.disabledTP = this.nbTPRestant <= 0;

        console.log('this', this.nbTDRestant);
      },
      complete: () => {
        console.log('done', this.ue);
      },
    });
    this.getEnseignement();
    this.validateForm = this.fb.group({
      CM: [null, { disabled: true }, [Validators.required]],
      TD: [null, { disabled: true }, [Validators.required]],
      TP: [null, { disabled: true }, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this._isDead$.unsubscribe();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.teachersService
      .getCourse(id)
      .subscribe((ue: ueProps) => (this.ue = ue));
    console.log(this.ue);
  }

  getEnseignement(): void {
    this.teachersService
      .getEnseignementFromTeacher(this.teachersService.userValue?.id || '')
      .subscribe((enseigne: Enseigne) => (this.enseigne = enseigne));
  }
  public showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }
  onSubmit(): void {
    Object.values(this.validateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      } else {
        const formData = this.validateForm.value;

        this.isVisible &&
          this.teachersService
            .addEnseignement(
              this.teachersService.userValue?.id || '',
              this.ue?.id || '',
              this.teachersService.getNombreHeure(
                this.teachersService.userValue?.status || 'ATER',
                this.ue?.heuresCM || 0,
                formData.CM,
                'CM'
              ),
              this.teachersService.getNombreHeure(
                this.teachersService.userValue?.status || 'ATER',
                this.ue?.heuresTD || 0,
                formData.TD,
                'TD'
              ),
              this.teachersService.getNombreHeure(
                this.teachersService.userValue?.status || 'ATER',
                this.ue?.heuresTP || 0,
                formData.TP,
                'TP'
              ),
              parseInt(formData.CM),
              parseInt(formData.TD),
              parseInt(formData.TP)
            )
            .subscribe((response) => {
              console.log('response: ', response);
            });

        this.isVisible = false;
        this.validateForm.reset();
      }
    });
  }
}
