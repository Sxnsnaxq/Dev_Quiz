import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findAll(page: number, limit: number): Promise<{ data: Product[]; total: number }> {
    const [data, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findOne(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async update(productId: number, product: Product): Promise<void> {
    const existingProduct = await this.productRepository.findOne({
      where: { productId },
    });
    if (!existingProduct) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    await this.productRepository.update(productId, product);
  }

  async remove(productId: number): Promise<void> {
    const existingProduct = await this.productRepository.findOne({
      where: { productId },
    });
    if (!existingProduct) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    await this.productRepository.delete(productId);
  }
}
