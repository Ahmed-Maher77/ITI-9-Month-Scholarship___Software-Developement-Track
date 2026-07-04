import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findByIds(ids);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create(createProductDto);
  }
}
