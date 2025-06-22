import { Component } from '@angular/core';
import { SignaturePadAngularComponent } from 'signature-pad-angular';

@Component({
  selector: 'app-root',
  imports: [SignaturePadAngularComponent],
  styleUrl: './app.component.scss',
  template: `
    <div class="signature-wrapper">
      <div class="wrap">
        <ng-signature-pad></ng-signature-pad>
      </div>
    </div>
  `,
})
export class AppComponent {}
