import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.html',
  imports: [ProgressBarModule],
})
export class Boot implements OnInit {
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  readonly progressBarValue = signal(0);

  ngOnInit(): void {
    interval(1500)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        takeWhile(() => this.progressBarValue() < 100, true),
      )
      .subscribe(() => {
        const next = Math.min(this.progressBarValue() + 40 + Math.floor(Math.random() * 10), 100);

        this.progressBarValue.set(next);

        if (next === 100) {
          this._router.navigate(['/login']);
        }
      });
  }
}
