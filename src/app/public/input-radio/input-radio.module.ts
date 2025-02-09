import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { InputRadioOptionComponent } from './input-radio-option.component';
import { InputRadioComponent } from './input-radio.component';

@NgModule({
  declarations: [InputRadioComponent, InputRadioOptionComponent],
  exports: [InputRadioComponent, InputRadioOptionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class InputRadioModule {}
