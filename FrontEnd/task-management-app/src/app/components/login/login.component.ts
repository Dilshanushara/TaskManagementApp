import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  @Output() loginSuccess = new EventEmitter<void>();
  private apiUrl = 'https://localhost:7031/api/tasks';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMessage = '';
    const credentials = btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`,
    });

    this.http.get(this.apiUrl, { headers }).subscribe(
      (res) => {
        // Store credentials for the interceptor
        localStorage.setItem('basicAuthToken', credentials);
        this.loginSuccess.emit();
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password. Please try again.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
        setTimeout(() => (this.errorMessage = ''), 3000); // hide the message after 3 seconds
      }
    );
  }
}
