import { IsInt, Min } from "class-validator";

export class UpdateQuantityDetailDto {
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
