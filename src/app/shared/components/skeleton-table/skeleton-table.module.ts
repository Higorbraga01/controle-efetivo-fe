import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { SkeletonTableComponent } from './skeleton-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SkeletonTableComponent],
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule
  ],
  exports: [SkeletonTableComponent]
})
export class SkeletonTableModule { }
