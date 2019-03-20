import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Cakes } from '../../models/cakes.interface';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent {

  @Input() 
  parent: FormGroup;

  @Input() 
  cakes: Cakes[];

  @Output()
  removed = new EventEmitter<any>();

  quantity: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sizes: string[] = ['small', 'medium', 'large'];

  totalPrice: number;

  get stocks(){
    return (this.parent.get('stock') as FormArray).controls;
  }

  onRemove(group, index){
    this.removed.next({group, index});
  }

  getPrice(id, quantity, size): number{
    return parseFloat(this.cakes.find(el => el.id == id).price[size]) * quantity;
  }

  getTotalPrice(): number{
    const control = (this.parent.get('stock') as FormArray).value;

    return control.reduce((total, element) => {
      return total + parseFloat(this.cakes.find(el => el.id == element.product_id).price[element.quantitySize]) * element.quantity;
    }, 0);
  }

}
