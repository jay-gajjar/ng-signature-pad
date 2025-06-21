import { Component } from '@angular/core';
import { SignaturePadComponent } from 'signature-pad';

@Component({
  selector: 'app-root',
  imports: [SignaturePadComponent],
  template: `
    <div class="signature-wrapper">
      <div class="wrap">
        <lib-signature-pad> </lib-signature-pad>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
