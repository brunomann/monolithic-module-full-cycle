import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase
{
    private _repository: ClientGateway;

    constructor(repository: ClientGateway){
        this._repository = repository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto>
    {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            address: input.address,
            document: input.document,
            street: input.street,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipcode: input.zipcode,
            number: input.number
        }

        const cliente = new Client(props);
        this._repository.add(cliente);

        return {
            id: cliente.id.id,
            name: cliente.name,
            email: cliente.email,
            address: cliente.address,
            document: cliente.document,
            street: cliente.street,
            complement: cliente.complement,
            city: cliente.city,
            state: cliente.state,
            zipcode: cliente.zipcode,
            number: cliente.number,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        }
    }
}