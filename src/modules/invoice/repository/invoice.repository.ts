import Invoice from "../domain/invoice.entity";
import invoiceEntity from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "../usecase/find-invoice/find-invoice.dto";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway
{
    async createInvoice(invoiceInput: invoiceEntity): Promise<void> {
        console.log(invoiceInput)
        const invoice = {
            id: invoiceInput.id.id,
            name: invoiceInput.name,
            document: invoiceInput.document,
            street: invoiceInput.address.street,
            number: invoiceInput.address.number,
            complement: invoiceInput.address.complement,
            city: invoiceInput.address.city,
            state: invoiceInput.address.state,
            zipCode: invoiceInput.address.zipCode,
            items: invoiceInput.items.map((item) => ({id: item.id.id, name: item.name, price: item.price}))
        };

        await InvoiceModel.create( invoice, {include: [{model: ProductModel}]}  );

    }

    async findInvoice(invoiceInput: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        const invoiceDb = await InvoiceModel.findOne({where: {id: invoiceInput.id}, include: ["items"]});

        if(!invoiceDb){
            throw new Error("Invoice not found");
        }

        return {
            id: invoiceDb.id,
            name: invoiceDb.name,
            document: invoiceDb.document,
            address: {
              street: invoiceDb.street,
              number: invoiceDb.number,
              complement: invoiceDb.complement,
              city: invoiceDb.city,
              state: invoiceDb.state,
              zipCode: invoiceDb.zipCode,
            },
            items: invoiceDb.items.map((item) => ({ id: item.id, name: item.name, price: item.price}) ),
            total: invoiceDb.items.reduce((total, item) => total + item.price, 0),
            createdAt: invoiceDb.createdAt,
          }
    }
    
}