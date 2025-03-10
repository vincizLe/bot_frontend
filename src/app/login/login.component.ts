import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      FormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      NgIf
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

      onSubmit() {
          this.authService.login(this.username, this.password).subscribe({
              next: (response) => {
                  localStorage.setItem('userId', response.id.toString());
                  this.router.navigate(['/chatbot']);
              },
              error: (err) => {
  
                if (err.status === 404) { 
                    this.errorMessage = err.error?.detail || 'Usuario o contraseña incorrecta';
                } else if (err.status === 500) { 
                    this.errorMessage = 'Error de servidor. Intente de nuevo por favor.';
                } else {
                    this.errorMessage = 'Se produjo un error inesperado. Inténtalo nuevamente.';
                }
            }
          });
      }
}
