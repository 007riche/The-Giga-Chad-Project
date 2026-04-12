import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private interval?: ReturnType<typeof setInterval>;
  // ReturnType: generic type wrapper provided by typescript
  // NodeJS.Timeout;

  private destroyRef = inject(DestroyRef);
constructor() {
  // Subscription of the currentStatus signal
  effect(() => {
    console.log(this.currentStatus())
  })
}

  // COMPONENT LIFECYLE, HUM INTERESTING !!
  // dOC

  // At the initialisation of the component
  // Can be invoke without adding the OnInit interface to the Component
  // One advantage of the interface is the enforcement of Non Contract violation,
  // can be helpfull preventing from Typo errors for example whne calling this methods instead
  ngOnInit() {
    this.interval = setInterval(() => {
      const rand = Math.random();

      if (rand < 0.5) {
        // this.currentStatus = 'online';
        this.currentStatus.set('online');
      } else if (rand < 0.9) {
        // this.currentStatus = 'offline';
        this.currentStatus.set('offline');
      } else {
        // this.currentStatus = 'unknown';
        this.currentStatus.set('unknown');
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
