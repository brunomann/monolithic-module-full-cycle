import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputtDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface
{
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface, catalogFacade: StoreCatalogFacadeInterface, repository: CheckoutGateway, invoiceFacade: InvoiceFacadeInterface, paymentFacade: PaymentFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputtDto> {
        // Validacao de cliente
        const client = await this._clientFacade.find({id: input.clientId}); 
        if(!client){
            throw new Error("Client not found");
        }

        // Validacao de produto
        await this.validateProducts(input);

        // Recupera Produto
        const products = await Promise.all(
            input.products.map((product) => this.getProduct(product.productId))
        );

        // Cria objeto do client
        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
        });

        // Cria objeto da order(client, products)
        const order = new Order({
            client: myClient,
            products
        });

        // process-payment
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total
        });

        // Se pagamento foi aprovado -> Gerar Invoice
        const invoice = 
            payment.status === 'approved'
                ? await this._invoiceFacade.createInvoice({
                    name: client.name,
                    document: client.document,
                    street: client.street,
                    complement: client.complement,
                    number: client.number,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipCode,
                    items: products.map((item) => {
                        return {
                            id: item.id.id, name: item.name, price: item.salesPrice
                        }
                    })
                }) : null;
        // Mudar status da order para approved
        payment.status === "approved" && order.approved();
        await this._repository.addOrder(order);
    
        // Retornar DTO
        return {
            id: order.id.id,
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => {
                return {productId: p.id.id}
            })
        }
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

    private async getProduct(productId: string): Promise<Product>
    {
        const product = await this._catalogFacade.find({id: productId});

        if(!product){
            throw new Error("Product not found");
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        });
    }

}