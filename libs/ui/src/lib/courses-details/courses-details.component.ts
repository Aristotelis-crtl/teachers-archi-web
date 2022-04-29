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
  public nbCMRestant = 0;
  public nbTPRestant = 0;
  public nbTDRestant = 0;
  disabledTD = false;
  disabledTP = false;
  disabledCM = false;

  private _isDead$ = new Subject();

  validateForm!: FormGroup;
  isVisible = false;
  errorVisible = false;
  errorMessage = '';
  constructor(
    public teachersService: TeachersService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEnseignement();

    this.getCourse();
    this.validateForm = this.fb.group({
      CM: [null, { disabled: true }, [Validators.required]],
      TD: [null, { disabled: true }, [Validators.required]],
      TP: [null, { disabled: true }, [Validators.required]],
    });
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.teachersService.getCourse(id).subscribe({
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
      },
      complete: () => null,
    });
  }

  getEnseignement(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.teachersService
      .getEnseignementFromTeacher(
        `${this.teachersService.userValue?.id}-${id}` || ''
      )
      .subscribe((enseigne: Enseigne) => {
        this.enseigne = enseigne;
        console.log('enseigne:', this.enseigne);
      });
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
        const nbGroupeCM =
          formData.CM === null || formData.CM === '' ? null : formData.CM;
        const nbGroupeTP =
          formData.TP === null || formData.TP === '' ? null : formData.TP;
        const nbGroupeTD =
          formData.TD === null || formData.TD === '' ? null : formData.TD;
        if (nbGroupeCM > 0 && nbGroupeCM) {
          if (
            (this.nbTDRestant > 0 &&
              nbGroupeTD === null &&
              !this.enseigne?.groupesTD) ||
            (this.nbTPRestant > 0 &&
              nbGroupeTP === null &&
              !this.enseigne?.groupesTP)
          ) {
            this.errorVisible = true;
            this.errorMessage =
              'Veuillez choisir un groupe de TD et TP si vous êtes responsables de CM.';
          } else {
            this.errorVisible = false;
          }
        }
        !this.errorVisible &&
          this.isVisible &&
          this.teachersService
            .addEnseignement(
              this.teachersService.userValue?.id || '',
              this.ue?.id || '',
              this.enseigne?.id || '',
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
              nbGroupeCM === null ? 0 : nbGroupeCM,
              nbGroupeTD === null ? 0 : nbGroupeTD,
              nbGroupeTP === null ? 0 : nbGroupeTP
            )
            .subscribe(() => {
              this.getCourse();
              this.getEnseignement();
            });

        this.isVisible = this.errorVisible;
        this.validateForm.reset();
      }
    });
  }
}
