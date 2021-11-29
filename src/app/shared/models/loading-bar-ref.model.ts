import { OverlayRef } from '@angular/cdk/overlay';

export class LoadingBarRef {
  constructor(private readonly overlay: OverlayRef) {}

  close() {
    this.overlay.dispose();
  }
}
