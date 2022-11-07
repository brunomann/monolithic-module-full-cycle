import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputtDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface
{
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface, catalogFacade: StoreCatalogFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<void> {
        // Validacao de cliente
        const client = await this._clientFacade.find({id: input.clientId}); 
        if(!client){
            throw new Error("Client not found");
        }

        // Validacao de produto
        await this.validateProducts(input);
        // Recupera Produto

        // Cria objeto do client

        // Cria objeto da order(client, products)

        // process-payment

        // Se pagamento foi aprovado -> Gerar Invoice
        // Mudar status da order para approved

        // Retornar DTO
        return
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void>
    {
        if(input.products.length === 0){
            throw new Error("No products selected");
        }

        for(const p of input.products){
            const productStock = await this._productFacade.checkStock({productId: p.productId});

            if(productStock.stock <= 0){
                throw new Error(`Product ${p.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string)
    {

    }

}