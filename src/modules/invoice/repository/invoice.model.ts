import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import ProductModel from "./product.model";

@Table({
    tableName: "invoice",
    timestamps: false
})
export default class InvoiceModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare document: string;

    @Column({allowNull: false})
    declare street: string;

    @Column({allowNull: false})
    declare number: string;

    @Column({allowNull: false})
    declare complement: string;

    @Column({allowNull: false})
    declare city: string;

    @Column({allowNull: false})
    declare state: string;

    @Column({allowNull: false})
    declare zipcode: string;

    @HasMany(() => ProductModel)
    declare items: ProductModel[];

}