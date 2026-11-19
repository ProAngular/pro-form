import { startWith } from 'rxjs';

import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputDirective } from '../input.directive';

@Component({
  selector: 'pro-input-checkbox[label]',
  templateUrl: './input-checkbox.component.html',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input-checkbox.component.scss',
})
export class InputCheckboxComponent
  extends InputDirective<boolean | null>
  implements OnInit
{
  private readonly destroyRef = inject(DestroyRef);

  public readonly labelPosition = input<'before' | 'after'>('after');

  // eslint-disable-next-line @angular-eslint/no-output-native
  public readonly change = output<boolean>();

  public ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        startWith(this.formControl.value),
        takeUntilDestroyed(this.destroyRef),
      )
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
