import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputDirective } from '../input.directive';
import { InputChipComponent } from './input-chip.component';

const rF = { required: false };
const rFc = { required: false, transform: coerceBooleanProperty };

@Component({
  selector: 'pro-input-chips',
  templateUrl: './input-chips.component.html',
  styleUrl: './input-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class InputChipsComponent extends InputDirective<string> {
  @ContentChildren(InputChipComponent) public readonly chips =
    new QueryList<InputChipComponent>();
  @ViewChild(MatChipListbox) public readonly matChipListbox?: MatChipListbox;

  @Input(rF) public max: number | undefined;

  @Input(rFc) public multiple = false;

  @Input(rF) public compareWith: MatChipListbox['compareWith'] = (
    optionValue,
    selectedValue,
  ) => {
    return (
      JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
      optionValue === selectedValue
    );
  };
}
