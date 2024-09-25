import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Task 3: Declare variables here
  logInForm!: FormGroup;
  userid!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Task 3: Initiate the form here
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  // Task 3: Add onSubmit()  method here
  onSubmit() {
    if (this.logInForm.invalid) {
      return;
    }
    const username = this.logInForm.get('username')?.value;
    const password = this.logInForm.get('password')?.value;
    this.authService.signIn(username, password);
  }
}
