import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: Id;
    client: Client;
    products: Product[];
    status?: string;
}

export default class Order extends BaseEntity
{
    private _client: Client;
    private _products: Product[];
    private _status: string;

    constructor(orderProps: OrderProps)
    {
        super(orderProps.id);
        this._client = orderProps.client;
        this._products = orderProps.products;
        this._status = orderProps.status || "pending";
    }

    get client():Client { return this._client; }
    get products():Product[] { return this._products; } 
    get status() { return this._status; }
    get total():number { 
        return this._products.reduce((total, product) => {
            return total + product.salesPrice
            }, 0
        );
    }
    approved(){ this._status = "approved";}
}