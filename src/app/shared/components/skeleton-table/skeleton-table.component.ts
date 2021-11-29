import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'shrd-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss']
})
export class SkeletonTableComponent implements OnInit{

  @Input()
  public mockDataSize: number;
  @Input()
  public numberOfColumns: number;
  @Input()
  public loading: boolean;

  public loadingMockData: any = [];
  public fakeCols: any = [];

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    if (this.mockDataSize < 0) {
      this.mockDataSize = 1;
    }
    this.loadingMockData = new Array(this.mockDataSize).fill({});
    this.fakeCols = new Array(this.numberOfColumns).fill({ header: '' });
  }
}
