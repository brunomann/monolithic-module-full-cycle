import AggregatedRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type clientProps  = {
    id?: Id;
    name: string;
    email: string;
    address: string;
}

export default class Client extends BaseEntity implements AggregatedRoot
{
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(input: clientProps){
        super(input.id);
        this._name = input.name;
        this._email = input.email;
        this._address = input.address;

    }

    get name(){ return this._name;}
    get email(){ return this._email;}
    get address(){ return this._address;}
}