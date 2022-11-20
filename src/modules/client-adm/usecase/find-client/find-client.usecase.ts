import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export default class FindClientUseCase implements UseCaseInterface
{
    private _repository: ClientGateway;

    constructor(repository: ClientGateway){
        this._repository = repository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto>
    {
        const client = await this._repository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            document: client.document,
            street: client.street,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipcode: client.zipcode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}