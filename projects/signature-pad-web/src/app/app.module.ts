import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignaturePadAngularModule } from 'signature-pad-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
