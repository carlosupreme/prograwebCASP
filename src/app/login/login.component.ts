import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class  LoginComponent {
  public email = '';
  public password = '';
  public error = ""

  constructor(private authService: AuthService, private router: Router) { 
  }

  login() {
  
    if (this.password.length === 0 || this.email.length === 0) {
      this.error = "Todos los campos son requeridos"
      return
    }
    const loggedIn = this.authService.login(this.email, this.password)

    if (!loggedIn) {
      this.error = "Credenciales incorrectas"
    } else {
      this.router.navigate(['/dashboard'])
    }
  }
}
