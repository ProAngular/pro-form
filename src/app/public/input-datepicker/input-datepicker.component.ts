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
import { InputAppearance } from '../types';
import { LoadingInputComponent } from '../utilities/loading-input.component';

@Component({
  selector: 'pro-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DateTimePipe,
    LoadingInputComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  standalone: true,
})
export class InputDatepickerComponent extends InputDirective<DateTime> {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public max: DateTime | undefined;
  @Input({ required: false }) public min: DateTime | undefined;
}
