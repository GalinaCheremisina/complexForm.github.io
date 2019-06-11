import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BakeryInventoryModule } from './bakery-inventory/bakery-inventory.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BakeryInventoryModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
