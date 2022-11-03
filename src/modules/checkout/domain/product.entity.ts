import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    salesPrice: number;
}

export default class Product extends BaseEntity implements AggregatedRoot
{
    private _name: string;
    private _description: string;
    private _salesPrice: number;

    constructor(productProps: ProductProps)
    {
        super(productProps.id);
        this._name = productProps.name;
        this._description = productProps.description;
        this._salesPrice = productProps.salesPrice;
    }

    get name(){ return this._name;}
    get description(){ return this._description;}
    get salesPrice(){ return this._salesPrice;}
}