import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputtDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface
{
    execute(input: PlaceOrderInputDto): Promise<void> {
        return 
    }

}