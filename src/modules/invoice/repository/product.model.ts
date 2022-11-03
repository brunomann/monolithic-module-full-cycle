import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "products",
    timestamps: false
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @ForeignKey(()  => InvoiceModel)
    @Column({allowNull: false})
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}