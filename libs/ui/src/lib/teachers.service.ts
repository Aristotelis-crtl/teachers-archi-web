import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '@prisma/client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private API_URL = 'http://localhost:3333/api'
  
  constructor(public http: HttpClient) { }

  public getTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/teachers`)
  }
}
