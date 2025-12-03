import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  booleanAttribute,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputAppearance } from '../types';

@UntilDestroy()
@Component({
  selector: 'pro-input-loading',
  templateUrl: './input-loading.component.html',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  styleUrl: './input-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputLoadingComponent implements OnInit {
  @Input() public appearance: InputAppearance = 'outline';

  @HostBinding('class.hide-hint')
  @Input({ transform: booleanAttribute })
  public hideHint = false;

  @Input() public hint: string | undefined;

  @Input() public label: string | undefined;

  protected readonly formControl = new FormControl<string | null>(null);

  protected loadingText = 'Loading';

  public ngOnInit(): void {
    this.formControl.disable();

    interval(500)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.loadingText === 'Loading') {
          this.loadingText = this.label
            ? `Loading "${this.label}".`
            : 'Loading.';
        } else if (this.loadingText.endsWith('...')) {
          this.loadingText = this.label ? `Loading "${this.label}"` : 'Loading';
        } else {
          this.loadingText = this.loadingText + '.';
        }
        this.formControl.setValue(this.loadingText);
      });
  }
}
