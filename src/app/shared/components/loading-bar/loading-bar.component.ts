import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoadingBarRef } from '../../models/loading-bar-ref.model';

const ANIMATION_TIMINGS = '600ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'notf-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('* => void', style({ opacity: 1 })),
      state('void => *', style({ opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ]),
  ],
})
export class LoadingBarComponent implements OnInit {
  constructor(readonly ref: LoadingBarRef) {}

  ngOnInit(): void {}
}
