export interface FindClientInputDto
{
    id: string;
}

export interface FindClientOutputDto
{
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
    createdAt: Date;
    updatedAt: Date;
}