import { IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  clientId: number;

  @ApiProperty({ enum: ['Cash', 'Visa'] })
  @IsEnum(['Cash', 'Visa'] as const)
  paymentMethod: 'Cash' | 'Visa';
}
