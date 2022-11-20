import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-admn.facade.factory";
import { ClientModel } from "../repository/client-model";
import ClientRepository from "../repository/client.repository.";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";



describe("ClientAdm Facade unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined,
        });

        const input = {
            id: "1",
            name: "John",
            email: "x@x.com",
            address: "Rua 1",
            document: "Document 1",
            street: "Street 1",
            complement: "Complement 1",
            number: "Number 1",
            state: "State 1",
            zipCode: "Zipcode 1",
            city: "City 1",
        };
        await facade.add(input);

        const clientDb = await ClientModel.findOne({where: {id: "1"}});
        
        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(input.id);
        expect(clientDb.name).toBe(input.name);
        expect(clientDb.email).toBe(input.email);
        expect(clientDb.address).toBe(input.address);

    });

    it("should find a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUsecase(repository);
        const findUsecase = new FindClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: findUsecase,
        });

        const input = {
            id: "1",
            name: "John",
            email: "x@x.com",
            address: "Rua 1",
            document: "Document 1",
            street: "Street 1",
            complement: "Complement 1",
            number: "Number 1",
            state: "State 1",
            zipCode: "Zipcode 1",
            city: "City 1",
        };
        await facade.add(input);

        const clientDb = await facade.find({id: input.id});
        
        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(input.id);
        expect(clientDb.name).toBe(input.name);
        expect(clientDb.email).toBe(input.email);
        expect(clientDb.address).toBe(input.address);

    });

    it("should create and find a client using facade factory", async () => {
        const facadeFactory = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "John",
            email: "x@x.com",
            address: "Rua 1",
            document: "Document 1",
            street: "Street 1",
            complement: "Complement 1",
            number: "Number 1",
            state: "State 1",
            zipCode: "Zipcode 1",
            city: "City 1",
        };
        await facadeFactory.add(input);

        const clientDb = await facadeFactory.find({id: input.id});
        
        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(input.id);
        expect(clientDb.name).toBe(input.name);
        expect(clientDb.email).toBe(input.email);
        expect(clientDb.address).toBe(input.address);

    });
});