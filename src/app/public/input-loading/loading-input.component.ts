import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputAppearance } from '../types';

const rF = { required: false };

@UntilDestroy()
@Component({
  selector: 'pro-input-loading',
  template: `
    <mat-form-field [appearance]="appearance">
      <input [formControl]="formControl" matInput type="text" />
      @if (hint) {
        <mat-hint [title]="hint">{{ hint }}</mat-hint>
      }
    </mat-form-field>
  `,
  styles: [':host { width: 100%; }'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class InputLoadingComponent implements OnInit {
  @Input(rF) public appearance: InputAppearance = 'outline';
  @Input(rF) public hint?: string;
  @Input(rF) public label?: string;

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
