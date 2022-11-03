import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { FacadePaymentInputDto, FacadePaymentOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface
{
    private _processPaymentUsecase: UseCaseInterface;
    
    constructor(usecase: UseCaseInterface)
    {
        this._processPaymentUsecase = usecase;
    }

    process(input: FacadePaymentInputDto): Promise<FacadePaymentOutputDto> {
        return this._processPaymentUsecase.execute(input);
    }
    
}