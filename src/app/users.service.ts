import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<User[]>('https://api.escuelajs.co/api/v1/users')
  }

}
