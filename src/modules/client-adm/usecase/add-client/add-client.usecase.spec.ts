import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add Client  usecase unit test", () => {

    it("should add a new client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Rua 1",
            document: "Document 1",
            street: "Street 1",
            complement: "Complement 1",
            number: "Number 1",
            state: "State 1",
            zipcode: "Zipcode 1",
            city: "City 1",
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email)
        expect(result.address).toBe(input.address);
    });
})