import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import Client from "../domain/client.entity";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCaseProps
{
    findUsecase: UseCaseInterface,
    addUsecase: UseCaseInterface,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface
{
    private _findUseCase: UseCaseInterface;
    private _addUseCase: UseCaseInterface;

    constructor(input: UseCaseProps){
        this._findUseCase = input.findUsecase
        this._addUseCase = input.addUsecase
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }
    
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const client = await this._findUseCase.execute({id: input.id});

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }

}