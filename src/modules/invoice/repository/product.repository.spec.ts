import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

describe("Invoice repository unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([InvoiceModel, ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create and find a product", async () => {
        const invoiceRepository = new InvoiceRepository();
        const item1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10
        });

        const invoice = new Invoice({
            id: new Id("3"),
            name: "Name 1",
            document: "Document 1",
            address: new Address({
                street: "Street 1",
                number: "Number 1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "Zip Code 1",
            }),
            items: [item1]
        });

        const result = await invoiceRepository.createInvoice(invoice);
        const productDb = await ProductModel.findOne({where: {id: item1.id.id}});

        expect(productDb.id).toBe(item1.id.id);
        expect(productDb.name).toBe(item1.name);
        expect(productDb.price).toBe(item1.price);
    })
});