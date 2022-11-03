import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "./address.value-object";
import Product from "./product.entity";

type invoiceProps = {
    id?: Id; // criado automaticamente
    name: string;
    document: string;
    address: Address // value object
    items: Product[] // Product entity
}

export default class Invoice extends BaseEntity implements AggregatedRoot
{
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(invoiceProps: invoiceProps){
        super(invoiceProps.id);
        this._name = invoiceProps.name;
        this._document = invoiceProps.document;
        this._address = invoiceProps.address;
        this._items = invoiceProps.items;
    }

    get name(){ return this._name;}
    get document(){ return this._document;}
    get address(){ return this._address;}
    get items(){ return this._items; }
}