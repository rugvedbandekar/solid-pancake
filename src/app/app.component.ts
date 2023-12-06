import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManagerModule } from './manager/manager.module';
import { PosModule } from './pos/pos.module';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { InMemoryAuthService } from './auth/auth.inmemory,service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { MediaObserver } from '@angular/flex-layout';
import { SubSink } from 'subsink';
import { combineLatest, tap } from 'rxjs';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    { provide: AuthService, useClass: InMemoryAuthService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  template: `
    <div class="app-container">
      <mat-toolbar
        class="app-toolbar"
        [class.app-is-mobile]="media.isActive('xs')"
        color="primary"
        fxLayoutGap="8px"
        *ngIf="{
          status: authService.authStatus$ | async,
          user: authService.currentUser$ | async
        } as auth"
      >
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button [routerLink]="'/home'">
          <mat-icon svgIcon="lemon"></mat-icon>
          <h1>LemonMart</h1>
        </a>
        <span class="flex-spacer"></span>
        <button
          mat-mini-fab
          [routerLink]="'/user/profile'"
          matTooltip="Profile"
          aria-label="User Profile"
          *ngIf="auth?.status?.isAuthenticated"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          mat-mini-fab
          [routerLink]="'/user/logout'"
          matTooltip="Logout"
          aria-label="Logout"
          *ngIf="auth?.status?.isAuthenticated"
        >
          <mat-icon>lock_open</mat-icon>
        </button>
      </mat-toolbar>
      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="media.isActive('xs') ? 'over' : 'side'"
          [fixedInViewport]="media.isActive('xs')"
          fixedTopGap="56"
          [(opened)]="opened"
        >
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .app-is-mobile .app-toolbar {
        position: fixed;
        z-index: 2;
      }
      .app-sidenav-container {
        flex: 1;
      }
      .app-is-mobile .app-sidenav-container {
        flex: 1 0 auto;
      }
      mat-sidenav {
        width: 200px;
      }
      .image-cropper {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        margin-top: -8px;
      }
    `,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    FlexLayoutModule,
    HomeComponent,
    PageNotFoundComponent,
    RouterModule,
    SimpleDialogComponent,
    NavigationMenuComponent,
  ],
})
export class AppComponent {
  private subs = new SubSink();
  opened: boolean = false;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    public media: MediaObserver
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    );
  }

  ngOnInit() {
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$,
    ])
      .pipe(
        tap(([mediaValue, authStatus]) => {
          if (!authStatus?.isAuthenticated) {
            this.opened = false;
          } else {
            if (mediaValue[0].mqAlias === 'xs') {
              this.opened = false;
            } else {
              this.opened = true;
            }
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
