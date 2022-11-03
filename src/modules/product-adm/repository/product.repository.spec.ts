import {Sequelize} from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";
import ProductModel from "./productmodel";

describe("Product respository teste unit", () => {

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

    it("should create a product", async () => {
        const productPros = {
            id: new Id("1"),
            name: "Produto 1",
            description: "Este e um produto",
            purchasePrice: 100,
            stock: 2
        };
        const product = new Product(productPros);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({where: {id: product.id.id}});

        expect(productPros.id.id).toEqual(productDb.id);
        expect(productPros.name).toEqual(productDb.name);
        expect(productPros.description).toEqual(productDb.description);
        expect(productPros.purchasePrice).toEqual(productDb.purchasePrice);
        expect(productPros.stock).toEqual(productDb.stock);

    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1",
            purchasePrice: 100,
            stock: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1")
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(5);
    })
});