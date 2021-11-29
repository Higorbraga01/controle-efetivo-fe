import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { LoadingBarComponent } from './loading-bar.component';

import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [CommonModule, ProgressBarModule, OverlayModule],
})
export class LoadingBarModule {}
