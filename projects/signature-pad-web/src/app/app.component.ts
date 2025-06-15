import { Component } from '@angular/core';
import { SignaturePadComponent } from 'signature-pad';

@Component({
  selector: 'app-root',
  imports: [SignaturePadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signature-pad-web';
}
