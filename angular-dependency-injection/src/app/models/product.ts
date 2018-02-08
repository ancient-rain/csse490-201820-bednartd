export class Product {
    public id: number;
    public title: string;
    public price: number;
    public description: string;

    constructor( title: string) {
            this.title = title;
    }

    set productId(id: number) {
        this.id = id;
    }

    set productPrice(price: number) {
        this.price = price;
    }

    set productDescription(description: string) {
        this.description = description;
    }


}
