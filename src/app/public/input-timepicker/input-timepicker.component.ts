import { DateTime } from 'luxon';
import { DateTimePipe } from '../pipes/date-time.pipe';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { InputDirective } from '../input.directive';

@Component({
  selector: 'pro-input-timepicker',
  templateUrl: './input-timepicker.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    DateTimePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTimepickerComponent extends InputDirective<DateTime> {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public interval: string | number | null = null;
  @Input({ required: false }) public max: DateTime | undefined;
  @Input({ required: false }) public min: DateTime | undefined;
}
