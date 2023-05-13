import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private ngAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.ngAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Logged in successfully');
        this.loadUser();

        this.loggedIn.next(true);
        this.isLoggedInGuard = true;

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }

  loadUser() {
    this.ngAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
  logout() {
    this.ngAuth.signOut().then(() => {
      this.toastr.info('User logged out');

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  isLogged() {
    return this.loggedIn.asObservable();
  }
}
