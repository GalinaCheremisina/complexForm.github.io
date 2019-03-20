import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BakeryInventoryModule } from './bakery-inventory/bakery-inventory.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BakeryInventoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
