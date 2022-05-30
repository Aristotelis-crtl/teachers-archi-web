import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enseigne, Prisma, UE, User, Status, Rules } from '@prisma/client';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
//const prisma = new PrismaClient()
export interface ueProps extends UE {
  Enseigne?: Enseigne[];
}
export type enseignementTeacherProps = User & {
  Enseigne: (Enseigne & {
    ue: {
      intitule: string;
    };
  })[];
};

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private API_URL = 'http://localhost:3333/api';
  private userSubject: BehaviorSubject<User | null>;

  public user: Observable<User | null>;

  constructor(public http: HttpClient, private router: Router) {
    const userObject = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(
      userObject ? JSON.parse(userObject) : null
    );
    this.user = this.userSubject.asObservable();
  }

  //Teachers controllers
  public createUser(data: Prisma.UserCreateInput): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/teachers`, data);
  }

  public updateUser(
    data: Prisma.UserUpdateInput,
    id: string
  ): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/teachers/update/${id}`, data);
  }

  public updateRules(
    data: Prisma.RulesUpdateInput,
    id: string
  ): Observable<Rules> {
    return this.http.put<Rules>(
      `${this.API_URL}/teachers/admin/rules/${id}`,
      data
    );
  }

  public getTeachers(): Observable<enseignementTeacherProps[]> {
    return this.http.get<enseignementTeacherProps[]>(
      `${this.API_URL}/teachers`
    );
  }
  public getRules(): Observable<Rules> {
    return this.http.get<Rules>(`${this.API_URL}/teachers/admin/rules`);
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  public isSignedIn(): boolean {
    return this.userValue ? true : false;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${this.API_URL}/teachers/login`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  //Courses controllers
  public getCourses(): Observable<ueProps[]> {
    return this.http.get<ueProps[]>(`${this.API_URL}/teachers/courses`).pipe(
      map((user) => {
        return user;
      })
    );
  }

  public getCourse(id: string): Observable<ueProps> {
    return this.http.get<ueProps>(`${this.API_URL}/teachers/courses/${id}`);
  }

  public getTeacher(id: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/teachers/${id}`);
  }
  public removeTeacher(id: string): Observable<User> {
    return this.http.delete<User>(`${this.API_URL}/teachers/remove/${id}`);
  }
  public removeEnseignement(id: string): Observable<Enseigne> {
    return this.http.delete<Enseigne>(
      `${this.API_URL}/teachers/remove/enseignement/${id}`
    );
  }

  public getAllEnseignementFromTeacher(
    id: string
  ): Observable<enseignementTeacherProps> {
    return this.http.get<enseignementTeacherProps>(
      `${this.API_URL}/teachers/enseigne/all/${id}`
    );
  }

  //Enseignement controllers
  public getEnseignements(): Observable<Enseigne[]> {
    return this.http.get<Enseigne[]>(`${this.API_URL}/teachers/enseigne`);
  }
  public getEnseignementFromTeacher(id: string): Observable<Enseigne> {
    return this.http.get<Enseigne>(`${this.API_URL}/teachers/enseigne/${id}`);
  }
  addEnseignement(
    userId: string,
    uEId: string,
    id: string,
    statut: Status,
    heuresCM?: number,
    heuresTD?: number,
    heuresTP?: number,
    groupesCM?: number,
    groupesTD?: number,
    groupesTP?: number
  ) {
    return this.http
      .post<Enseigne>(`${this.API_URL}/teachers/enseigne`, {
        userId,
        uEId,
        id,
        heuresCM,
        heuresTD,
        heuresTP,
        groupesCM,
        groupesTD,
        groupesTP,
        statut,
      })
      .pipe(
        map((enseigne) => {
          return enseigne;
        })
      );
  }
}
