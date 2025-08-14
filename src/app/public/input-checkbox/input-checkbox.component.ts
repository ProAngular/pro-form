import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';


import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputDirective } from '../input.directive';

@UntilDestroy()
@Component({
  selector: 'pro-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule
],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputCheckboxComponent
  extends InputDirective<boolean | null>
  implements OnInit
{
  @Input({ required: false })
  public labelPosition: 'before' | 'after' = 'after';

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
