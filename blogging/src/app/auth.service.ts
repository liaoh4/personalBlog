import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import * as bcrypt from "bcryptjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  firestoreSubscription: any;

  private usernameSubject = new BehaviorSubject<string>(
    localStorage.getItem('username') || ''
  );
  username$: Observable<string> = this.usernameSubject.asObservable();

  setUsername(username: string): void {
    localStorage.setItem('username', username);
    this.usernameSubject.next(username);
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }

  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  signIn(username: string, password: string) {
    this.firestore.collection('admin', ref =>
      ref.where('username', '==', username)
    ).get().subscribe({
      next: (querySnapshot) => {
        if (querySnapshot.size === 1) {
          querySnapshot.forEach((doc: any) => {
            const userData = doc.data();
            const hashedPasswordFromDB = userData.password; // Retrieve hashed password from Firestore
            if (bcrypt.compareSync(password, hashedPasswordFromDB)) { // Compare hashed passwords
              // Valid credentials, proceed with sign-in
              this.setUsername(username);
              // Navigate to home page
              this.router.navigate(['']);

            } else {
              // Invalid credentials
              window.alert('Invalid credentials');
            }
          });
        } else {
          // Username not found
          window.alert('Invalid credentials');
        }
      },
      error: (error: any) => {
        // Handle Firestore query error
        window.alert(error);
      }
    });
  }

  ngOnDestroy() {
    if (this.firestoreSubscription) {
      this.firestoreSubscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.setUsername('');
    this.router.navigate(['/adminlogin']);
  }

}