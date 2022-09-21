import { NgModule } from '@angular/core';
import { CheckTree } from './checktree.component';
import { CommonModule } from '@angular/common'; 
import { ChecktreeService } from './checktree.service';

@NgModule({
  declarations: [
    CheckTree
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CheckTree
  ]
})
export class ChecktreeModule { }
