import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload } from '../interfaces/loginPayload';
import { User } from '../interfaces/user';
import { TokenPayload } from '../interfaces/tokenPayload';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendAddress = environment.backendAddress;

  jwtHelper = new JwtHelperService();

  private $isLoggedIn = new BehaviorSubject(false);
  isLoggedIn = this.$isLoggedIn.asObservable();

  private $user = new BehaviorSubject<User | null>(null);
  user = this.$user.asObservable() as Observable<User>;

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: LoginPayload) {
    return this.http
      .post<TokenPayload>(`${this.backendAddress}/auth/login`, loginData)
      .pipe(
        switchMap((res) => {
          localStorage.setItem('session-token', res.loginToken);
          this.$isLoggedIn.next(true);
          return this.http.get<User>(
            `${this.backendAddress}/users/${
              this.jwtHelper.decodeToken(res.loginToken).sub
            }`
          );
        }),
        tap((res) => {
          this.$user.next(res);
        })
      );
  }

  verifyLogin() {
    const st = localStorage.getItem('session-token');
    if (st) {
      if (!this.jwtHelper.isTokenExpired(st)) {
        const decoded = this.jwtHelper.decodeToken(st);
        this.http
          .get<User>(`${this.backendAddress}/users/${decoded.sub}`)
          .subscribe((res) => {
            this.$user.next(res);
          });
        this.$isLoggedIn.next(true);
        this.router.navigate(['home']);
      } else {
        this.logout();
      }
    } else {
      this.$isLoggedIn.next(false);
      this.router.navigate(['']);
    }
  }

  logout() {
    localStorage.removeItem('session-token');
    this.$isLoggedIn.next(false);
    this.$user.next(null);
    this.router.navigate(['']);
  }

  editUser(id: number, editedProfile: Partial<User>) {
    return this.http
      .patch<User>(`${this.backendAddress}/users/${id}`, editedProfile)
      .pipe(
        tap((res) => {
          this.$user.next(res);
        })
      );
  }
}
