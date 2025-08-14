import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { InputLoadingComponent } from '../input-loading/loading-input.component';
import { InputDirective } from '../input.directive';
import { DateTimePipe } from '../pipes';
import { InputAppearance } from '../types';

const rF = { required: false };

@Component({
  selector: 'pro-input-timepicker',
  templateUrl: './input-timepicker.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    CommonModule,
    DateTimePipe,
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTimepickerComponent extends InputDirective<DateTime> {
  @Input(rF) public appearance: InputAppearance = 'outline';
  @Input(rF) public interval: string | number | null = null;
  @Input(rF) public max: DateTime | undefined;
  @Input(rF) public min: DateTime | undefined;
}
