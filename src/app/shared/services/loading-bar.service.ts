import { LoadingBarComponent } from './../components/loading-bar/loading-bar.component';
import { LoadingBarRef } from './../models/loading-bar-ref.model';
import { Injectable, Injector } from '@angular/core';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  private _last: LoadingBarRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  start(): LoadingBarRef {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const loadingBarRef = new LoadingBarRef(overlayRef);

    if (this._last) {
      this._last.close();
    }

    this._last = loadingBarRef;

    const injector = this.getInjector(loadingBarRef, this.parentInjector);
    const loadingPortal = new ComponentPortal(
      LoadingBarComponent,
      null,
      injector
    );

    overlayRef.attach(loadingPortal);

    return loadingBarRef;
  }

  end(): void {
    this._last.close();
  }

  getPositionStrategy(): GlobalPositionStrategy {
    return this.overlay.position().global().top('0').left('0');
  }

  getInjector(loadingBarRef: LoadingBarRef, parentInjector: Injector): Injector {
    return Injector.create({
      providers: [{ provide: LoadingBarRef, useValue: loadingBarRef }],
      parent: parentInjector,
    });
  }
}
