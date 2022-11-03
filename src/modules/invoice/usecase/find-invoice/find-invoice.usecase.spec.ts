import { string } from "yup";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const product = new Product({
    id: new Id("2"),
    name: "Product 1",
    price: 10
});

const invoice = new Invoice({
    id: new Id("1"), 
    name: "Invoice 1",
    document: "Document 1",
    address: new Address({
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "1234567",
    }),
    items: [product]
});

const MockRepository = () =>{
    return {
        createInvoice: jest.fn(),
        findInvoice: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("Find invoice usecase unit test", () => {
    
    it("should find a invoice", async() => {
        const invoiceRepository = MockRepository();
        const findInvoiceUsecase = new FindInvoiceUsecase(invoiceRepository);

        const result = await findInvoiceUsecase.execute({id: "1"});

        expect(invoiceRepository.findInvoice).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(product.id);
        expect(result.items[0].name).toBe(product.name);
        expect(result.items[0].price).toBe(product.price);
    });
});