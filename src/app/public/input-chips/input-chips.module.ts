import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputChipComponent } from './input-chip.component';
import { InputChipsComponent } from './input-chips.component';

@NgModule({
  declarations: [InputChipComponent, InputChipsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [InputChipComponent, InputChipsComponent],
})
export class InputChipsModule {}
