import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { combineLatest, filter, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    LoginComponent,
  ],
  template: `
    <div
      *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin"
    >
      <app-login></app-login>
    </div>
    <ng-template #doLogin>
      <span class="mat-display-3"
        >You get a lemon, you get a lemon, you get a lemon...</span
      >
    </ng-template>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {}

  login() {
    this.authService.login('manager@test.com', '12345678');

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(
          ([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager']);
        })
      )
      .subscribe();
  }
}
