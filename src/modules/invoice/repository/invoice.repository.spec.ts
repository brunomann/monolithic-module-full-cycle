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

        sequelize.addModels([InvoiceModel, ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {
        const invoiceRepository = new InvoiceRepository();
        const item1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10
        });

        const item2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 20
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
            items: [item1, item2]
        });

        const result = await invoiceRepository.createInvoice(invoice);
        const invoiceDb = await InvoiceModel.findOne({where: {id: invoice.id.id}, include: ["items"]});

        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.street).toBe(invoice.address.street);
        expect(invoiceDb.number).toBe(invoice.address.number);
        expect(invoiceDb.complement).toBe(invoice.address.complement);
        expect(invoiceDb.city).toBe(invoice.address.city);
        expect(invoiceDb.state).toBe(invoice.address.state);
        expect(invoiceDb.zipcode).toBe(invoice.address.zipCode);
        expect(invoiceDb.items[0].id).toBe(item1.id.id);
        expect(invoiceDb.items[0].name).toBe(item1.name);
        expect(invoiceDb.items[0].price).toBe(item1.price);
        expect(invoiceDb.items[1].id).toBe(item2.id.id);
        expect(invoiceDb.items[1].name).toBe(item2.name);
        expect(invoiceDb.items[1].price).toBe(item2.price);
    });

    it("should find a invoice", async () => {
        const invoiceRepository = new InvoiceRepository();
        const item1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10
        });

        const item2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 20
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
            items: [item1, item2]
        });

        const result = await invoiceRepository.createInvoice(invoice);
        const invoiceDb = await invoiceRepository.findInvoice({id: invoice.id.id});

        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.address.street).toBe(invoice.address.street);
        expect(invoiceDb.address.number).toBe(invoice.address.number);
        expect(invoiceDb.address.complement).toBe(invoice.address.complement);
        expect(invoiceDb.address.city).toBe(invoice.address.city);
        expect(invoiceDb.address.state).toBe(invoice.address.state);
        expect(invoiceDb.address.zipCode).toBe(invoice.address.zipCode);
        expect(invoiceDb.items[0].id).toBe(item1.id.id);
        expect(invoiceDb.items[0].name).toBe(item1.name);
        expect(invoiceDb.items[0].price).toBe(item1.price);
        expect(invoiceDb.items[1].id).toBe(item2.id.id);
        expect(invoiceDb.items[1].name).toBe(item2.name);
        expect(invoiceDb.items[1].price).toBe(item2.price);
    })
});