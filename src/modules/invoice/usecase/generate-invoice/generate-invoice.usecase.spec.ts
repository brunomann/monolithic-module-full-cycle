import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";


const MockRepository = () =>{
    return {
        createInvoice: jest.fn(),
        findInvoice: jest.fn(),
    }
}

describe("Generate invoice usecase unit test", () =>{

    it("should generate invoice using mock values", async() =>{
        const repository = MockRepository();
        const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);
        
        const item1 = {
            id: "1",
            name: "Product 1",
            price: 10
        };
        const item2 = {
            id: "2",
            name: "Product 2",
            price: 10
        };
        
        const input = {
            name: "Name 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip Code 1",
            items: [item1, item2]
        };

        const result = await generateInvoiceUsecase.execute(input);

        expect(repository.createInvoice).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toBe(item1.id);
        expect(result.items[0].name).toBe(item1.name);
        expect(result.items[0].price).toBe(item1.price);
        expect(result.items[1].id).toBe(item2.id);
        expect(result.items[1].name).toBe(item2.name);
        expect(result.items[1].price).toBe(item2.price);
    });

});