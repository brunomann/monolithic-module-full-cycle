import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Creatina",
    description: "Creatina 300G",
    purchasePrice: 169,
    stock: 2
});

const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("CheckStock usecase unit test", () => {

    it("should return a product stock", async () => {
        // Repository
        // Create product
        // Dto de check-stock do produto criado
        // expect no return do repository

        const productRepository = MockRepository();
        const checkStockUseCase = new CheckStockUseCase(productRepository);
        const input = {productId: "1"};

        const result = await checkStockUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBe("1");
        expect(result.stock).toBe(2);
    });
});