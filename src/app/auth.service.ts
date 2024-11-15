import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly USERS_ENDPOINT = "https://api.escuelajs.co/api/v1/users"
  private success = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.httpClient.get(this.USERS_ENDPOINT).subscribe((users: any) => {
      const user = users.find((user: any) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
        this.success = true;
      }
      return this.success;
    })
  }
}
