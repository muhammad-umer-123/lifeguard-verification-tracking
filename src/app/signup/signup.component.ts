import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  redCrossCertFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService

  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9\-\+\s\(\)]{7,15}$')]],
      dateOfBirth: ['', Validators.required],
      redCrossCert: [null, Validators.required],
      instructor: ['', Validators.required],
      selectDate: ['', Validators.required]
    });
  }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.redCrossCertFile = file;
      this.signupForm.patchValue({ redCrossCert: file });
    }
  }
  
  onSubmit() {
  this.submitted = true;
  if (this.signupForm.valid) {
    const formData = new FormData();
    Object.entries(this.signupForm.value).forEach(([key, value]) => {
      if (key === 'redCrossCert' && this.redCrossCertFile) {
        formData.append(key, this.redCrossCertFile);
      } else {
        formData.append(key, value as string);
      }
    });

    this.authService.registerUser(formData).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Registration failed', err);
      }
    });
  }
}

  get f() {
    return this.signupForm.controls;
  }
}
