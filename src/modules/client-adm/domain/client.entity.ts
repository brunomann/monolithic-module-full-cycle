import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
    document: string;
    street: string;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    number: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregatedRoot
{
    private _name: string;
    private _email: string;
    private _address: string;
    private _document: string;
    private _street: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipcode: string;
    private _number: string;

    constructor(clientProps: ClientProps){
        super(clientProps.id, clientProps.createdAt, clientProps.updatedAt);
        this._name = clientProps.name;
        this._email = clientProps.email;
        this._address = clientProps.address;
        this._document = clientProps.document;
        this._street = clientProps.street;
        this._complement = clientProps.complement;
        this._city = clientProps.city;
        this._state = clientProps.state;
        this._zipcode = clientProps.zipcode;
        this._number = clientProps.number;
    }

    get name() { return this._name;}
    get email() { return this._email;}
    get address() { return this._address;}
    get city() { return this._city;}
    get complement() { return this._complement;}
    get document() { return this._document;}
    get street() { return this._street;}
    get state() { return this._state;}
    get zipcode() { return this._zipcode;}
    get number() { return this._number;}
}