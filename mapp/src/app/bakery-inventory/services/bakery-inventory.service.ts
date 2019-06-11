import { Cakes, Stock } from '../models';

export class BakeryInventoryService {
    public order: Stock[] = [];
    private cakes: Cakes[] = [
        {
            id: 1,
            price: {
                small: 11,
                medium: 15,
                large: 30,
            },
            name: 'Black Cake',
        },
        {
            id: 2,
            price: {
                small: 1,
                medium: 5,
                large: 10,
            },
            name: 'Eggless Cake',
        },
        {
            id: 3,
            price: {
                small: 2,
                medium: 4,
                large: 8,
            },
            name: 'Cup Cake',
        },
        {
            id: 4,
            price: {
                small: 11,
                medium: 15,
                large: 30,
            },
            name: 'Oreo Cheesecake',
        },
        {
            id: 5,
            price: {
                small: 15,
                medium: 25,
                large: 30,
            },
            name: 'Truffle Cake',
        }
    ];

    public getCartItems(): Stock[] {
        return this.order.slice();
    }

    public getCakes(): Cakes[] {
        return this.cakes.slice();
    }
}
