import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

type productProps = {
    id?: Id; // criada automaticamente
    name: string;
    price: number;
}

export default class Product extends BaseEntity implements AggregatedRoot
{
    private _name: string;
    private _price: number;

    constructor(productProps: productProps){
        super(productProps.id);
        this._name = productProps.name;
        this._price = productProps.price;
    }

    get name(){ return this._name;}
    get price(){ return this._price;}
}