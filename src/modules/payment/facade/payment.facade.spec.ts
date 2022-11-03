import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

let sequelize: Sequelize;

beforeEach(async () => {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: {force: true},
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
});

afterEach(async () => {
    await sequelize.close();
});

describe("Payment facade unit test", () => {

    it("should create a transaction", async () => {
        const transactionRepository = new TransactionRepository();
        const transactionUsecase = new ProcessPaymentUseCase(transactionRepository);
        const transactionFacade = new PaymentFacade(transactionUsecase);

        const input = {
            orderId: "1",
            amount: 100
        }
        const result = await transactionFacade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");

    });
    it("should create a transaction using a factory", async () => {
        const transactionFacade = PaymentFacadeFactory.create();

        const input = {
            orderId: "1",
            amount: 100
        }
        const result = await transactionFacade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");

    });
});