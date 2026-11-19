import {
  Component,
  booleanAttribute,
  contentChildren,
  input,
  numberAttribute,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputDirective } from '../input.directive';
import { InputChipComponent } from './input-chip.component';

@Component({
  selector: 'pro-input-chips[label]',
  templateUrl: './input-chips.component.html',
  imports: [
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input-chips.component.scss',
})
export class InputChipsComponent extends InputDirective<string> {
  public readonly chips = contentChildren(InputChipComponent);

  public readonly matChipListbox = viewChild(MatChipListbox);

  public readonly max = input<number | undefined, unknown>(undefined, {
    transform: numberAttribute,
  });

  public readonly multiple = input(false, { transform: booleanAttribute });

  public readonly compareWith = input<MatChipListbox['compareWith']>(
    (optionValue, selectedValue) => {
      return (
        JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
        optionValue === selectedValue
      );
    },
  );
}
