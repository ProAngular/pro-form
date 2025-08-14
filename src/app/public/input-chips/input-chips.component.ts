import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { InputDirective } from '../input.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { InputChipComponent } from './input-chip.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'pro-input-chips',
  templateUrl: './input-chips.component.html',
  styleUrl: './input-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule
],
  standalone: true,
})
export class InputChipsComponent extends InputDirective<string> {
  @ContentChildren(InputChipComponent)
  public readonly chips = new QueryList<InputChipComponent>();
  
  @ViewChild(MatChipListbox) public readonly matChipListbox?: MatChipListbox;
  
  @Input() public max: number | undefined;

  @Input({ required: false, transform: coerceBooleanProperty }) 
  public multiple = false;

  @Input({ required: false }) public compareWith: MatChipListbox['compareWith'] = (
    optionValue,
    selectedValue,
  ) => {
    return (
      JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
      optionValue === selectedValue
    );
  };
}
