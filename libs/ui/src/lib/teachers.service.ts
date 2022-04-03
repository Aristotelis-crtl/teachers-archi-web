import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prisma, UE, User } from '@prisma/client';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
//const prisma = new PrismaClient()
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

  public createUser(data: Prisma.UserCreateInput): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/teachers`, data);
  }

  public getTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/teachers`);
  }

  public getCourses(): Observable<UE[]> {
    return this.http.get<UE[]>(`${this.API_URL}/teachers/courses`);
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${this.API_URL}/teachers/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
