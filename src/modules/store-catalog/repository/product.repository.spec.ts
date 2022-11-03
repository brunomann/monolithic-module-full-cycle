import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.respository";

describe("Product repository unit test", () => {
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

    it("should find all products in repository", async () => {
        
        await ProductModel.create({
            id: "1",
            name: "Produto 1",
            description: "Descricao 1",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Produto 2",
            description: "Descricao 2",
            salesPrice: 200,
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Produto 1");
        expect(products[0].description).toBe("Descricao 1");
        expect(products[0].salesPrice).toBe(100);
        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Produto 2");
        expect(products[1].description).toBe("Descricao 2");
        expect(products[1].salesPrice).toBe(200);
    });

    it("should find a product", async () =>{
        await ProductModel.create({
            id: "1",
            name: "Produto 1",
            description: "Descricao 1",
            salesPrice: 100,
        });

        const productRepository = new ProductRepository();
        const product = await productRepository.find("1");

        expect(product.id.id).toBe("1");
        expect(product.name).toBe("Produto 1");
        expect(product.description).toBe("Descricao 1");
        expect(product.salesPrice).toBe(100);
    });
});