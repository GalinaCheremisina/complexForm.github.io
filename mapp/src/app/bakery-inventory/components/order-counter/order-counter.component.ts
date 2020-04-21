import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCounterComponent implements ControlValueAccessor {
  @Input() public step: number = 1;
  @Input() public min: number = 1;
  @Input() public max: number = 100;

  public value$: BehaviorSubject<number> = new BehaviorSubject(1);
  public focus$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private onTouch: Function;
  private onModelCahge: Function;

  public writeValue = (value: number) => this.value$.next(value || 1);

  public registerOnTouched(fn): void {
    this.onTouch = fn;
  }

  public registerOnChange(fn): void {
    this.onModelCahge = fn;
  }

  public increment(): void {
    const currentValue = this.value$.value;
    if (currentValue < this.max) {
      this.value$.next(currentValue + this.step);
      this.onModelCahge(currentValue);
    }
    this.onTouch();
  }

  public decrement(): void {
    const currentValue = this.value$.value;
    if (currentValue > this.min) {
      this.value$.next(currentValue - this.step);
      this.onModelCahge(currentValue);
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
    this.focus$.next(false);
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  public onFocus(event: FocusEvent): void {
    this.focus$.next(true);
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }
}
