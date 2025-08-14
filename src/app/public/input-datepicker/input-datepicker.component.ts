import { DateTime } from 'luxon';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputLoadingComponent } from '../input-loading/loading-input.component';
import { InputDirective } from '../input.directive';
import { DateTimePipe } from '../pipes';
import { InputAppearance } from '../types';

const rF = { required: false };

@Component({
  selector: 'pro-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  standalone: true,
})
export class InputDatepickerComponent extends InputDirective<DateTime> {
  @Input(rF) public appearance: InputAppearance = 'outline';
  @Input(rF) public max: DateTime | undefined;
  @Input(rF) public min: DateTime | undefined;
}
