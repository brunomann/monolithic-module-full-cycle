import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface
{
    private _invoiceRepository: InvoiceGateway;
    
    constructor(repository: InvoiceGateway){
        this._invoiceRepository = repository;
    }
    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto>
    {
        const invoice = await this._invoiceRepository.findInvoice({id: input.id});
        const items =   invoice.items.map((item) => ({ id: item.id, name: item.name, price: item.price}) )

        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: items,
            total: invoice.items.reduce((total, item) => total + item.price, 0),
            createdAt: invoice.createdAt,
        }
    }
}