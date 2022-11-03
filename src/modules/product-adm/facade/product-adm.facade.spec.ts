import {Sequelize} from "sequelize-typescript"
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductRepository from "../repository/product.repository";
import ProductModel from "../repository/productmodel";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade.";

describe("ProductAdmFacade test unit", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("it should create a product", async() => {
        // const productRepository = new ProductRepository();
        // const addProductUseCase = new AddProductUseCase(productRepository);
        // const productFacade = new ProductAdmFacade(
        //     {
        //         addUseCase: addProductUseCase,
        //         stockUseCase: undefined
        //     }
        // );
        const productFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Teste",
            description: "Produto de teste",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({where: {id: "1"}});
        expect(product).toBeDefined();
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);

    });

    it("it should check a stock of product", async() => {
        // const productRepository = new ProductRepository();
        // const addProductUseCase = new AddProductUseCase(productRepository);
        // const productFacade = new ProductAdmFacade(
        //     {
        //         addUseCase: addProductUseCase,
        //         stockUseCase: undefined
        //     }
        // );
        const productFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Teste",
            description: "Produto de teste",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({productId: input.id});
        
        expect(result).toBeDefined();
        expect(result.productId).toBe(input.id);
        expect(result.stock).toBe(input.stock);

    });

});