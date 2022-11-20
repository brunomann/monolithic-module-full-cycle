export interface AddClientInputDto{
    id?: string;
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
}

export interface AddClientOutputDto{
    id: string;
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
    createdAt: Date;
    updatedAt: Date;
}