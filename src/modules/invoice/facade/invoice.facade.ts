import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from "./invoice.facade.interface";


export interface invoiceProps{
    generateInvoiceUsecase: GenerateInvoiceUsecase,
    findInvoiceUsecase: FindInvoiceUsecase,
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    
    private _generateInvoiceUsecase: GenerateInvoiceUsecase;
    private _findInvoiceUsecase: FindInvoiceUsecase;

    constructor(invoiceProps: invoiceProps){
        this._generateInvoiceUsecase = invoiceProps.generateInvoiceUsecase;
        this._findInvoiceUsecase = invoiceProps.findInvoiceUsecase;
    }

    async createInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const invoiceCreated = await this._generateInvoiceUsecase.execute(input);

        return invoiceCreated;
    }

    async findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        const invoiceFind = await this._findInvoiceUsecase.execute({id: input.id});

        return invoiceFind;
    }

}