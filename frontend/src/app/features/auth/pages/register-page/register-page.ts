import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    FloatLabel,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.controls.password.value !== this.registerForm.controls.confirmPassword.value) {
      this.registerForm.controls.confirmPassword.setErrors({ mismatch: true });
      this.registerForm.controls.confirmPassword.markAsTouched();
      return;
    }

    console.log('Cadastro realizado com sucesso', this.registerForm.getRawValue());
  }

  isFieldInvalid(controlName: string, error: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.touched && control?.hasError(error));
  }

  passwordsDoNotMatch(): boolean {
    const password = this.registerForm.controls.password.value;
    const confirmPassword = this.registerForm.controls.confirmPassword.value;
    return (
      this.registerForm.controls.confirmPassword.touched &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    );
  }
}
