import { DateTime } from 'luxon';

import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { InputLoadingComponent } from '../input-loading/input-loading.component';
import { InputDirective } from '../input.directive';
import { DateTimePipe } from '../pipes';
import { InputAppearance } from '../types';

@Component({
  selector: 'pro-input-timepicker[label]',
  templateUrl: './input-timepicker.component.html',
  imports: [
    DateTimePipe,
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  styleUrl: './input-timepicker.component.scss',
})
export class InputTimepickerComponent extends InputDirective<DateTime> {
  public readonly appearance = input<InputAppearance>('outline');

  public readonly interval = input<string | number | null>(null);

  public readonly max = input<DateTime | undefined>();

  public readonly min = input<DateTime | undefined>();
}
