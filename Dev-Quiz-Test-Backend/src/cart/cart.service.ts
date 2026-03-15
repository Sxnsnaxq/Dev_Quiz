import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Add a product to the cart
  async addProduct(productId: number, quantity: number): Promise<CartItem[]> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    let cartItem = await this.cartRepository.findOne({
      where: { productId: { productId } },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({ productId: product, quantity });
    }

    await this.cartRepository.save(cartItem);
    return this.cartRepository.find();
  }

  // Get all items in the cart
  async getCart(): Promise<{ items: CartItem[]; total: number }> {
    const items = await this.cartRepository.find();
    const total = items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    );
    return { items, total };
  }
}
