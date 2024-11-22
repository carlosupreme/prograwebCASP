import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  readonly USERS_ENDPOINT = "https://api.escuelajs.co/api/v1/users"
  private success = false;
  readonly users: User[] = [];

  constructor(private httpClient: HttpClient) {
    this.getUsers().subscribe((users: User[]) => {
      this.users.push(...users)
      console.log(users);
    });
  }

  ngOnInit() {

  }

  login(email: string, password: string) {
    const user = this.users.find((user: any) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.success = true;
    }
    return this.success;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.USERS_ENDPOINT);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
