import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    CommonModule,
    DateTimePipe,
    InputLoadingComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [provideLuxonDateAdapter()],
  styleUrl: './input-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputDatepickerComponent extends InputDirective<DateTime> {
  @Input() public appearance: InputAppearance = 'outline';

  @Input() public max: DateTime | undefined;

  @Input() public min: DateTime | undefined;
}
