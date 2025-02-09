import { DateTime } from 'luxon';
import { DateTimePipe } from '../pipes';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputDirective } from '../input.directive';

@Component({
  selector: 'pro-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    DateTimePipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatepickerComponent extends InputDirective<DateTime> {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public max: DateTime | undefined;
  @Input({ required: false }) public min: DateTime | undefined;
}
