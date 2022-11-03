import Invoice from "../domain/invoice.entity"
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "../usecase/find-invoice/find-invoice.dto";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.dto";

export default interface InvoiceGateway
{
    createInvoice(invoiceInout: Invoice): Promise<void>;
    findInvoice(invoiceInput: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto>;
}