import { IsNotEmpty } from 'class-validator';


export class CreateShoppingCartDto {

    @IsNotEmpty()
  userId: number;

    @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
    quantity: number;
}