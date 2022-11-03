import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import productEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./productmodel";

export default class ProductRepository implements ProductGateway{

    async add(product: productEntity): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({where: {id: id}});

        if(!product) {
            return new Product({
                id: new Id(product.id),
                name: "",
                description: "",
                purchasePrice: 0,
                stock: 0,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });
    }

}