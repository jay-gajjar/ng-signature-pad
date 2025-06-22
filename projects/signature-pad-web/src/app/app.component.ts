import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="signature-wrapper">
      <div class="wrap">
        <ng-signature-pad></ng-signature-pad>
      </div>
    </div>
  `,
})
export class AppComponent {}
