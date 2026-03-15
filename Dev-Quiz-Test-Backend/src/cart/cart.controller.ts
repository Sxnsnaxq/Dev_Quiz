import { Controller, Post, Get, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addProduct(@Body() body: { productId: number; quantity: number }) {
    return this.cartService.addProduct(body.productId, body.quantity);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }
}
