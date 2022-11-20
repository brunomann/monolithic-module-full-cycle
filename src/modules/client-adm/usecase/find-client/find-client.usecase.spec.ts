import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
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
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
}

describe("Find Client  usecase unit test", () => {

    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email)
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toBe(client.createdAt);
        expect(result.updatedAt).toBe(client.updatedAt);
    });
})