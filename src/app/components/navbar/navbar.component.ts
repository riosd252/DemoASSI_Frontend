import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user.subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.authSrv.logout();
  }
}
