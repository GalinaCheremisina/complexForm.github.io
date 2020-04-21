import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Cakes } from '../../models';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css'],
})
export class OrderProductsComponent {
  @Input() public parent: FormGroup;
  @Input() public cakes: Cakes[];
  @Output() public removed = new EventEmitter<any>();

  public quantity: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public sizes: string[] = ['small', 'medium', 'large'];
  public totalPrice: number;

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  public onRemove(group, index): void {
    this.removed.next({group, index});
  }

  public getPrice(id, quantity, size): number {
    return parseFloat(this.cakes.find(el => el.id === id).price[size]) * quantity;
  }

  public getTotalPrice(): number {
    const control = (this.parent.get('stock') as FormArray).value;

    return control.reduce((total, element) => {
      return total + parseFloat(this.cakes
        .find(
          el => el.id === element.product_id,
        ).price[element.quantitySize]) * element.quantity;
    }, 0);
  }
}
