import Id from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction1 = new Transaction({
    id: new Id(),
    amount: 100,
    orderId: "1",
    status: "approved"
});

const transaction2 = new Transaction({
    id: new Id(),
    amount: 50,
    orderId: "2",
    status: "declined"
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(transaction1)
    };
};

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(transaction2)
    };
};


describe("Process payment usecase unit test", () => {

    it("Should process a payment", async () => {
        const paymentRepository = MockRepository();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const result = await useCase.execute({
            orderId: "1",
            amount: 50,
        });

        expect(result.transactionId).toBe(transaction1.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction1.createdAt);
        expect(result.updatedAt).toBe(transaction1.updatedAt);
    });

    it("Should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const useCase = new ProcessPaymentUseCase(paymentRepository);

        const result = await useCase.execute({
            orderId: "1",
            amount: 50,
        });

        expect(result.transactionId).toBe(transaction2.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("2");
        expect(result.createdAt).toBe(transaction2.createdAt);
        expect(result.updatedAt).toBe(transaction2.updatedAt);
    });
});