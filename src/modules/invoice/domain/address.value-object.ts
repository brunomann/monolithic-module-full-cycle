type addressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}
export default class Address {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(addressProps: addressProps)
    {
        this._street = addressProps.street;
        this._number = addressProps.number;
        this._complement = addressProps.complement;
        this._city = addressProps.city;
        this._state = addressProps.state;
        this._zipCode = addressProps.zipCode;
    }

    get street(){ return this._street;}
    get number(){ return this._number;}
    get complement(){ return this._complement}
    get city(){ return this._city;}
    get state(){ return this._state;}
    get zipCode(){ return this._zipCode;}
}