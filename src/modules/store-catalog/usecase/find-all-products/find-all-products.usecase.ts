import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface
{
    private _repository: ProductGateway;

    constructor(repos: ProductGateway){
        this._repository = repos;
    }

    async execute(): Promise<FindAllProductsDto>{
        const products = await this._repository.findAll();
        
        return {
            products: products.map((product) =>({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })),
        };
    }
}