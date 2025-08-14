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
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';

import { InputLoadingComponent } from '../input-loading/loading-input.component';
import { InputDirective } from '../input.directive';
import { InputAppearance } from '../types';
import { InputDropdownOptionGroupComponent } from './input-dropdown-option-group.component';
import { InputDropdownOptionComponent } from './input-dropdown-option.component';

const rF = { required: false };
const rFc = { required: false, transform: coerceBooleanProperty };

@Component({
  selector: 'pro-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrl: './input-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    InputLoadingComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class InputDropdownComponent<T> extends InputDirective<T> {
  @ContentChildren(InputDropdownOptionComponent)
  public readonly options: QueryList<InputDropdownOptionComponent> =
    new QueryList<InputDropdownOptionComponent>();

  @ContentChildren(InputDropdownOptionGroupComponent)
  public readonly optionGroups: QueryList<InputDropdownOptionGroupComponent> =
    new QueryList<InputDropdownOptionGroupComponent>();

  @ViewChild(MatSelect) public readonly matSelect?: MatSelect;

  @Input(rF)
  public appearance: InputAppearance = 'outline';

  @Input() public max: number | undefined;

  private get exceedsMax(): boolean {
    return this.max !== undefined && this.selectedOptions.length > this.max;
  }

  protected get selectedOptions(): readonly InputDropdownOptionComponent[] {
    if (!this.matSelect) {
      return [];
    }

    const allOptions = [
      ...this.options.toArray(),
      ...this.optionGroups
        .toArray()
        .flatMap((group) => group.options.toArray()),
    ];

    // Single selection
    if (this.matSelect.selected instanceof MatOption) {
      const selectedValue = this.matSelect.selected.value;
      return allOptions.filter((option) => option.value === selectedValue);
    }

    // Multi-selection
    if (
      Array.isArray(this.matSelect.selected) &&
      this.matSelect.selected.every((s) => s instanceof MatOption)
    ) {
      const selectedValues = this.matSelect.selected.map(
        (selected) => (selected as MatOption).value,
      );
      return allOptions.filter((option) =>
        selectedValues.includes(option.value),
      );
    }

    // Default: No option is selected.
    return [];
  }

  @Input(rFc) public multiple = false;

  @Input(rF) public compareWith: MatSelect['compareWith'] = (
    optionValue,
    selectedValue,
  ) => {
    return (
      JSON.stringify(optionValue) === JSON.stringify(selectedValue) ||
      optionValue === selectedValue
    );
  };
}
