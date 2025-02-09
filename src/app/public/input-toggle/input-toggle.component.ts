import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { InputDirective } from '../input.directive';

@UntilDestroy()
@Component({
  selector: 'pro-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputToggleComponent
  extends InputDirective<boolean | null>
  implements OnInit
{
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public readonly change = new EventEmitter<boolean>();

  public ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(startWith(this.formControl.value), untilDestroyed(this))
      .subscribe((isChecked) => {
        if (this.formControl.disabled) {
          return;
        }

        if (this.isRequired && !isChecked) {
          this.formControl.setErrors({ required: true }, { emitEvent: false });
          this.formControl.setValue(null, { emitEvent: false });
        } else if (this.isRequired && isChecked) {
          this.formControl.setErrors(null);
        }

        if (isChecked !== null) {
          this.change.emit(isChecked);
        }
      });
  }
}
