import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    CommonModule,
    DateTimePipe,
    InputLoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  styleUrl: './input-timepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputTimepickerComponent extends InputDirective<DateTime> {
  @Input() public appearance: InputAppearance = 'outline';

  @Input() public interval: string | number | null = null;

  @Input() public max: DateTime | undefined;

  @Input() public min: DateTime | undefined;
}
