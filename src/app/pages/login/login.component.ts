import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const payload = {
        login: this.loginForm.value.login,
        password: this.loginForm.value.password
      };

      this.http.post<any>('http://localhost:8080/auth/login', payload).subscribe({
        next: (res) => {
          const token = res.data?.token;
          if (token) {
            sessionStorage.setItem('authToken', `Bearer ${token}`);
            this.router.navigate(['/playlists']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao fazer login.';
        }
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/']);
  }
}
