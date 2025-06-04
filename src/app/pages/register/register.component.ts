import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
        password: this.loginForm.value.password,
        role: 'USER'
      };

      this.http.post('http://localhost:8080/auth/register', payload).subscribe({
        next: (response: any) => {
          const message = response.message || 'Usuário registrado com sucesso!';
          alert(message);
          this.loginForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao registrar.';
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}