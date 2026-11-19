import { startWith } from 'rxjs';

import { Component, DestroyRef, OnInit, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { InputDirective } from '../input.directive';

@Component({
  selector: 'pro-input-toggle[label]',
  templateUrl: './input-toggle.component.html',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input-toggle.component.scss',
})
export class InputToggleComponent
  extends InputDirective<boolean | null>
  implements OnInit
{
  private readonly destroyRef = inject(DestroyRef);

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
