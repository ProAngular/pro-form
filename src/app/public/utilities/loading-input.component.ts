import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputAppearance } from '../types';

@UntilDestroy()
@Component({
  selector: 'pro-loading-input',
  template: `
    <mat-form-field [appearance]="appearance">
      <input [formControl]="formControl" matInput type="text" />
      @if (hint) {
        <mat-hint [title]="hint">{{ hint }}</mat-hint>
      }
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  standalone: true,
})
export class LoadingInputComponent implements OnInit {
  @Input({ required: false }) public appearance: InputAppearance = 'outline';
  @Input({ required: false }) public hint?: string;
  @Input({ required: false }) public label?: string;

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
