import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  amount: number;

  @Column('decimal', { precision: 10, scale: 7 })
  @ApiProperty()
  longitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  @ApiProperty()
  latitude: number;

  @Column()
  @ApiProperty()
  clientId: number;

  @Column({ type: 'enum', enum: ['Cash', 'Visa'] })
  @ApiProperty({ enum: ['Cash', 'Visa'] })
  paymentMethod: 'Cash' | 'Visa';
}
