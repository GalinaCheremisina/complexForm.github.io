import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OrderCounterComponent),
  multi: true
}

@Component({
  selector: 'app-order-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  templateUrl: './order-counter.component.html',
  styleUrls: ['./order-counter.component.css']
})
export class OrderCounterComponent implements ControlValueAccessor {

  @Input() step: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 100;

  value: number = 1;
  focus: boolean;

  private onTouch: Function;
  private onModelCahge: Function;

  writeValue(value: number){
    this.value = value || 1;
  }

  registerOnTouched(fn){
    this.onTouch = fn;
  }

  registerOnChange(fn){
    this.onModelCahge = fn;
  }

  increment(){
    if(this.value < this.max){
      this.value += this.step;
      this.onModelCahge(this.value);
    }
    this.onTouch();
  }

  decrement(){
    if(this.value > this.min){
      this.value -= this.step;
      this.onModelCahge(this.value);
    }
    this.onTouch();
  }

  onKeyDown(event: KeyboardEvent){
    const handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment(),
    };

    if(handlers[event.code]){
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();

  }
  
  onBlur(event: FocusEvent){
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }
  
  onFocus(event: FocusEvent){
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }
}
