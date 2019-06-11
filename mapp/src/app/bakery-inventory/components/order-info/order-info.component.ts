import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent {
  @Input()
  public parent: FormGroup;

  get invalidPhone() {
    return (this.parent.get('info.phone').hasError('invalidPhone') &&
      this.parent.get('info.phone').dirty &&
      !this.required('phone'));
  }

  public required(control: string): boolean {
    return this.parent
      .get(`info.${control}`).hasError('required') &&
      this.parent.get(`info.${control}`).touched;
  }
}
