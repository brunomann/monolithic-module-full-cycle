export interface FacadePaymentInputDto
{
    orderId: string;
    amount: number;
}

export interface FacadePaymentOutputDto
{
    transactionId: string;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface PaymentFacadeInterface
{
    process(input: FacadePaymentInputDto): Promise<FacadePaymentOutputDto>;
}