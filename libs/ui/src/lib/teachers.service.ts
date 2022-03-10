import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Prisma, User} from '@prisma/client'
import { Observable } from 'rxjs';


//const prisma = new PrismaClient()
@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private API_URL = 'http://localhost:3333/api'

  constructor(public http: HttpClient) { }

  public createUser(data: Prisma.UserCreateInput): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/teachers`,data)
  }
  
  public getTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/teachers`)
  }

}
