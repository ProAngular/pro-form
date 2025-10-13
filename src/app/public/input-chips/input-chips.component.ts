import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  booleanAttribute,
  numberAttribute,
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
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  styleUrl: './input-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputChipsComponent extends InputDirective<string> {
  @ContentChildren(InputChipComponent)
  public readonly chips = new QueryList<InputChipComponent>();

  @ViewChild(MatChipListbox)
  public readonly matChipListbox: MatChipListbox | undefined;

  @Input({ transform: numberAttribute })
  public max: number | string | undefined;

  @Input({ transform: booleanAttribute })
  public multiple = false;

  @Input() public compareWith: MatChipListbox['compareWith'] = (
    optionValue,
    selectedValue,
  ) => {
    return (
      JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
      optionValue === selectedValue
    );
  };
}
