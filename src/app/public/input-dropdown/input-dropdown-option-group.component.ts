import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';

import { InputDropdownOptionComponent } from './input-dropdown-option.component';

@Component({
  selector: 'pro-input-dropdown-option-group[label]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InputDropdownOptionGroupComponent {
  @Input({ required: true }) public label!: string;

  @ContentChildren(InputDropdownOptionComponent)
  public readonly options: QueryList<InputDropdownOptionComponent> =
    new QueryList<InputDropdownOptionComponent>();
}
