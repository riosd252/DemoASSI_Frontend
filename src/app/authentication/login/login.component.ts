import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginPayload } from 'src/app/interfaces/loginPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  subscriptions: Subscription[] = [];
  loginError!: string | null;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.verifyLogin();
  }

  login() {
    const login: LoginPayload = {
      email: this.loginData.get('email')!.value!,
      password: this.loginData.get('password')!.value!,
    };

    this.authSrv.login(login).subscribe((res) => {
      if (typeof res !== 'string') {
        this.router.navigate(['home']);
      } else {
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
