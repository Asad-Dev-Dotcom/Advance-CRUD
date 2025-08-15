import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CrudComponent } from './crud.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [EditFormComponent, CrudComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule
  ],
  exports : [CrudComponent]
})
export class CrudModule { }
