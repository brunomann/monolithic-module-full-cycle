import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.respository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory
{
    static create():StoreCatalogFacade
    {
        const repository = new ProductRepository();
        const findUseCase = new FindProductUsecase(repository);
        const findAllUseCase = new FindAllProductsUsecase(repository);

        const facade = new StoreCatalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase
        });

        return facade;

    }
}