import { AbstractControl } from '@angular/forms';

export class OrderValidator {
    static checkPhone(control: AbstractControl) {
        const regexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i;
        const valid = regexp.test(control.value);
        return valid ? null : { invalidPhone: true };
    }

    static checkStockExist(control: AbstractControl) {
        const stockItem = control.get('stock');
        const selector = control.get('selector');

        if (!(stockItem && selector)) {
            return null;
        }

        const exists = stockItem.value.some((stock) => {
            return stock.product_id === parseInt(selector.value.product_id, 10);
        });

        return exists ? { stockExists: true } : null;
    }

    static checkSelector(control: AbstractControl) {
        const selector = control.get('selector.product_id').value;
        return selector ? null : { emptySelector: true };
    }
}
