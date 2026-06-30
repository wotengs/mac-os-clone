import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.html',
  imports: [ProgressBarModule],
})
export class Boot implements OnInit {
  private readonly _router = inject(Router);

  progressBarValue = signal<number>(0);

  ngOnInit() {
    let interval = setInterval(() => {
      this.progressBarValue.set(this.progressBarValue() + Math.floor(Math.random() * 10) + 40);
      if (this.progressBarValue() >= 100) {
        this.progressBarValue.set(100);
        clearInterval(interval);
        this._router.navigate(['/login']);
      }
    }, 1500);
  }
}
