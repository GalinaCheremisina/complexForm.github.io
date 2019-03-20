import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BakeryInventoryComponent } from './containers/bakery-inventory/bakery-inventory';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderSelectorComponent } from './components/order-selector/order-selector.component';
import { OrderProductsComponent } from './components/order-products/order-products.component';
import { BakeryInventoryService } from './services/bakery-inventory.service';
import { OrderCounterComponent } from './components/order-counter/order-counter.component';


@NgModule({
  declarations: [
    BakeryInventoryComponent,
    OrderInfoComponent,
    OrderSelectorComponent,
    OrderProductsComponent,
    OrderCounterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BakeryInventoryComponent],
  providers: [BakeryInventoryService]
})
export class BakeryInventoryModule { }
