import { Model, PrimaryKey, Column, Table } from "sequelize-typescript";

@Table({
    tableName: "transaction",
    timestamps: false
})
export default class TransactionModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false, field: "order_id"})
    orderId: string;

    @Column({allowNull: false})
    amount: number;

    @Column({allowNull: false, field: "created_at"})
    createdAt: Date;

    @Column({allowNull: false, field: "updated_at"})
    updatedAt: Date;
}