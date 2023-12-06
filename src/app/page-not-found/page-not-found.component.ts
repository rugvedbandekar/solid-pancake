import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <p>
      This page doesn't exist. Go back to
      <a [routerLink]="'/home'">home</a>.
    </p>
  `,
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
