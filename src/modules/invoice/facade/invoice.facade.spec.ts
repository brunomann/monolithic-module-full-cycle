import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceFacadeFactory from "../factory/invoice.facadade.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import ProductModel from "../repository/product.model";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("Invoice facade unit test", () => {

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

    it("Should create a invoice using facade", async () => {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUsecase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({generateInvoiceUsecase: generateInvoiceUseCase, findInvoiceUsecase: undefined});

        const item1 = {
            id: "1",
            name: "Product 1",
            price: 10
        };
        const inputGenerateInvoice = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items: [item1]
        }
        const invoiceCreated = await invoiceFacade.createInvoice(inputGenerateInvoice);
        const invoiceDb = await InvoiceModel.findOne({where: {id: invoiceCreated.id}, include: ["items"]});

        expect(invoiceDb.id).toBeDefined();
        expect(invoiceDb.name).toBe(inputGenerateInvoice.name);
        expect(invoiceDb.document).toBe(inputGenerateInvoice.document);
        expect(invoiceDb.street).toBe(inputGenerateInvoice.street);
        expect(invoiceDb.number).toBe(inputGenerateInvoice.number);
        expect(invoiceDb.complement).toBe(inputGenerateInvoice.complement);
        expect(invoiceDb.city).toBe(inputGenerateInvoice.city);
        expect(invoiceDb.state).toBe(inputGenerateInvoice.state);
        expect(invoiceDb.zipCode).toBe(inputGenerateInvoice.zipCode);
        expect(invoiceDb.items[0].id).toBe(item1.id);
        expect(invoiceDb.items[0].name).toBe(item1.name);
        expect(invoiceDb.items[0].price).toBe(item1.price);
    });

    it("Should create a invoice using factory facade", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create();

        const item1 = {
            id: "1",
            name: "Product 1",
            price: 10
        };
        const inputGenerateInvoice = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "Number 1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1",
            items: [item1]
        }
        const invoiceCreated = await invoiceFacade.createInvoice(inputGenerateInvoice);
        const invoiceDb = await InvoiceModel.findOne({where: {id: invoiceCreated.id}, include: ["items"]});

        expect(invoiceDb.id).toBeDefined();
        expect(invoiceDb.name).toBe(inputGenerateInvoice.name);
        expect(invoiceDb.document).toBe(inputGenerateInvoice.document);
        expect(invoiceDb.street).toBe(inputGenerateInvoice.street);
        expect(invoiceDb.number).toBe(inputGenerateInvoice.number);
        expect(invoiceDb.complement).toBe(inputGenerateInvoice.complement);
        expect(invoiceDb.city).toBe(inputGenerateInvoice.city);
        expect(invoiceDb.state).toBe(inputGenerateInvoice.state);
        expect(invoiceDb.zipCode).toBe(inputGenerateInvoice.zipCode);
        expect(invoiceDb.items[0].id).toBe(item1.id);
        expect(invoiceDb.items[0].name).toBe(item1.name);
        expect(invoiceDb.items[0].price).toBe(item1.price);
    });

    it("Should find a invoice using facade", async () => {
        const invoiceRepository = new InvoiceRepository();
        const generateInvoiceUseCase = new GenerateInvoiceUsecase(invoiceRepository);
        const findInvoiceUsecase = new FindInvoiceUsecase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({generateInvoiceUsecase: generateInvoiceUseCase, findInvoiceUsecase: findInvoiceUsecase});

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
        const resultFacade = await invoiceFacade.findInvoice({id: invoice.id.id});

        expect(resultFacade.id).toBeDefined();
        expect(resultFacade.name).toBe(invoice.name);
        expect(resultFacade.document).toBe(invoice.document);
        expect(resultFacade.address.street).toBe(invoice.address.street);
        expect(resultFacade.address.number).toBe(invoice.address.number);
        expect(resultFacade.address.complement).toBe(invoice.address.complement);
        expect(resultFacade.address.city).toBe(invoice.address.city);
        expect(resultFacade.address.state).toBe(invoice.address.state);
        expect(resultFacade.address.zipCode).toBe(invoice.address.zipCode);
        expect(resultFacade.items[0].id).toBe(item1.id.id);
        expect(resultFacade.items[0].name).toBe(item1.name);
        expect(resultFacade.items[0].price).toBe(item1.price);
        expect(resultFacade.items[1].id).toBe(item2.id.id);
        expect(resultFacade.items[1].name).toBe(item2.name);
        expect(resultFacade.items[1].price).toBe(item2.price);
    });

    it("Should find a invoice using factory facade", async () => {
        const invoiceRepository = new InvoiceRepository();
        const invoiceFacade = InvoiceFacadeFactory.create();
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
        const resultFacade = await invoiceFacade.findInvoice({id: invoice.id.id});

        expect(resultFacade.id).toBeDefined();
        expect(resultFacade.name).toBe(invoice.name);
        expect(resultFacade.document).toBe(invoice.document);
        expect(resultFacade.address.street).toBe(invoice.address.street);
        expect(resultFacade.address.number).toBe(invoice.address.number);
        expect(resultFacade.address.complement).toBe(invoice.address.complement);
        expect(resultFacade.address.city).toBe(invoice.address.city);
        expect(resultFacade.address.state).toBe(invoice.address.state);
        expect(resultFacade.address.zipCode).toBe(invoice.address.zipCode);
        expect(resultFacade.items[0].id).toBe(item1.id.id);
        expect(resultFacade.items[0].name).toBe(item1.name);
        expect(resultFacade.items[0].price).toBe(item1.price);
        expect(resultFacade.items[1].id).toBe(item2.id.id);
        expect(resultFacade.items[1].name).toBe(item2.name);
        expect(resultFacade.items[1].price).toBe(item2.price);
    });
});