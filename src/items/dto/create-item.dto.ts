import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * user.id
   * JwtStrategyを介して取得したユーザー情報が格納される
   * バリデーションを介さない場合は値が入らない
   */
  userId?: string;
}
