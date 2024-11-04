import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordEquals });
  }

  private passwordEquals(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.alertComponent.showAlert('Por favor, complete todos los campos correctamente.', 'warning');
      return;
    }

    const { username, password } = this.registerForm.value;

    this.authService.register(username, password).subscribe({
      next: (response) => {
        const successMessage = response?.message || 'Registro exitoso';
        this.alertComponent.showAlert(successMessage, 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Error en el registro. Intente nuevamente.';
        this.alertComponent.showAlert(errorMessage, 'error');
      },
    });
  }
}
