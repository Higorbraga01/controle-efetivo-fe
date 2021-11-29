import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, ButtonModule, RouterModule],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
