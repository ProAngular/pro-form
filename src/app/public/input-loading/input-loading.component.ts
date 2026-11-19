import { interval } from 'rxjs';

import {
  Component,
  DestroyRef,
  OnInit,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputAppearance } from '../types';

@Component({
  selector: 'pro-input-loading',
  templateUrl: './input-loading.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  styleUrl: './input-loading.component.scss',
  host: {
    '[class.hide-hint]': 'hideHint()',
  },
})
export class InputLoadingComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  public readonly appearance = input<InputAppearance>('outline');

  public readonly hideHint = input(false, { transform: booleanAttribute });

  public readonly hint = input<string | undefined>();

  public readonly label = input<string | undefined>();

  protected readonly formControl = new FormControl<string | null>(null);

  protected loadingText = 'Loading';

  public ngOnInit(): void {
    this.formControl.disable();

    interval(500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const label = this.label();
        if (this.loadingText === 'Loading') {
          this.loadingText = label ? `Loading "${label}".` : 'Loading.';
        } else if (this.loadingText.endsWith('...')) {
          this.loadingText = label ? `Loading "${label}"` : 'Loading';
        } else {
          this.loadingText = this.loadingText + '.';
        }
        this.formControl.setValue(this.loadingText);
      });
  }
}
