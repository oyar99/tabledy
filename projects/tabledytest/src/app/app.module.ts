import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabledyModule } from 'tabledy';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TabledyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
