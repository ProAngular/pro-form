import { DateTime } from 'luxon';

import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputLoadingComponent } from '../input-loading/input-loading.component';
import { InputDirective } from '../input.directive';
import { DateTimePipe } from '../pipes';
import { InputAppearance } from '../types';

@Component({
  selector: 'pro-input-datepicker[label]',
  templateUrl: './input-datepicker.component.html',
  imports: [
    DateTimePipe,
    InputLoadingComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  styleUrl: './input-datepicker.component.scss',
})
export class InputDatepickerComponent extends InputDirective<DateTime> {
  public readonly appearance = input<InputAppearance>('outline');

  public readonly max = input<DateTime | undefined>();

  public readonly min = input<DateTime | undefined>();
}
