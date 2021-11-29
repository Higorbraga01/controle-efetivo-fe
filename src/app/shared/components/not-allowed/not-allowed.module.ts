import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAllowedComponent } from './not-allowed.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotAllowedComponent],
  imports: [CommonModule, RouterModule],
})
export class NotAllowedModule {}
