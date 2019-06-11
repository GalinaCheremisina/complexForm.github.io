import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OrderCounterComponent),
  multi: true,
};

@Component({
  selector: 'app-order-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  templateUrl: './order-counter.component.html',
  styleUrls: ['./order-counter.component.css'],
})
export class OrderCounterComponent implements ControlValueAccessor {
  @Input() public step = 1;
  @Input() public min = 1;
  @Input() public max = 100;

  public value = 1;
  public focus: boolean;
  private onTouch: Function;
  private onModelCahge: Function;

  public writeValue(value: number) {
    this.value = value || 1;
  }

  public registerOnTouched(fn): void {
    this.onTouch = fn;
  }

  public registerOnChange(fn): void {
    this.onModelCahge = fn;
  }

  public increment(): void {
    if (this.value < this.max) {
      this.value += this.step;
      this.onModelCahge(this.value);
    }
    this.onTouch();
  }

  public decrement(): void {
    if (this.value > this.min) {
      this.value -= this.step;
      this.onModelCahge(this.value);
    }
    this.onTouch();
  }

  public onKeyDown(event: KeyboardEvent): void {
    const handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment(),
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }

  public onBlur(event: FocusEvent): void {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  public onFocus(event: FocusEvent): void {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }
}
