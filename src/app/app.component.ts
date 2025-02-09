import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormComponent } from './form/form.component';
import { BodyComponent, FooterComponent, HeaderComponent } from './layout';

@Component({
  selector: 'pro-root',
  imports: [
    BodyComponent,
    FooterComponent,
    FormComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
