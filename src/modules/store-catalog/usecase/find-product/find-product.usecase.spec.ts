import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product-entity";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description",
    salesPrice: 200
});

const MockRepository = () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
};

describe("Find product unit test", () =>{

    it("should find a product in repository", async() =>{
        const repository = MockRepository();
        const usecase = new FindProductUsecase(repository);

        const result = await usecase.execute({id: "1"});

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Description");
        expect(result.salesPrice).toBe(200);
    });
})
