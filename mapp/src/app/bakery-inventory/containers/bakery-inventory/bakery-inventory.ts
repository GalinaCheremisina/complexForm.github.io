import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Cakes } from '../../models/cakes.interface';
import { BakeryInventoryService } from '../../services/bakery-inventory.service';
import { OrderValidator } from '../../validators/order.validator';

@Component({
  selector: 'bakery-inventory',
  templateUrl: './bakery-inventory.html',
  styleUrls: ['./bakery-inventory.css']
})
export class BakeryInventoryComponent implements OnInit {

    cakes: Cakes[] = [];

    form = this.fb.group({
        info: this.fb.group({
            name: ['', Validators.required],
            surname: '',
            email: '',
            phone: ['', [Validators.required, OrderValidator.checkPhone]],
            city: '',
            address: '',
            state: '',
        }),
        selector: this.createStock({}),
        stock: this.fb.array([])
    });

    constructor(
        private fb: FormBuilder,
        private _bakeryService: BakeryInventoryService
    ) {}

    ngOnInit(){
        this.cakes = this._bakeryService.getCakes();
    }
    
    createStock(stock): FormGroup {
        return this.fb.group({
            product_id: parseInt(stock.product_id, 10) || '',
            quantity: parseInt(stock.quantity, 10) || 1,
            quantitySize: stock.quantitySize || 'small'
        })
    }

    added(stock: any): void {
        if(stock.quantitySize ==='') stock.quantitySize = 'small';

        stock = {
            ...stock,
            product_id:parseInt(stock.product_id, 10),
            quantity:parseInt(stock.quantity, 10)};

        const control = this.form.get('stock') as FormArray;

        const elIndex = control.value.findIndex(el => 
            el.product_id === stock.product_id && el.quantitySize === stock.quantitySize);
            
        if(elIndex !== -1){
           const total = control.value[elIndex].quantity + stock.quantity;
           control.removeAt(elIndex);
           stock = {...stock,quantity: total};
           control.push(this.createStock(stock));
        } else {
            control.push(this.createStock(stock));
        }
        
    }

    removed({group, index}): void {
        const control = this.form.get('stock') as FormArray;
        
        control.removeAt(index);
    }

    onSubmit(): void {
        console.log(this.form.value);
    }

    onClear(): void {
        const control = this.form.get('stock') as FormArray;
        
        for(let i=control.value.length-1; i >=0; i--){
            this.removed({group:{}, index: i})
        }
        
        this.form.reset();
    }
}
