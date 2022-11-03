import Product from "../domain/product-entity";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, StoreCatalogFacadeInterface } from "./store-catalog.facade.interface";

export interface UseCaseProps{
    findUseCase: FindProductUsecase,
    findAllUseCase: FindAllProductsUsecase,
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface
{
    private _findUseCase: FindProductUsecase;
    private _findAllUseCase: FindAllProductsUsecase;

    constructor(useProps: UseCaseProps){
        this._findUseCase = useProps.findUseCase;
        this._findAllUseCase = useProps.findAllUseCase;
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
    {
        return await this._findAllUseCase.execute();
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
    {
        return await this._findUseCase.execute(id);
    }
}