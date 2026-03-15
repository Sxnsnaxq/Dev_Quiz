import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.productService.findAll(page, limit);
  }

  @Get(':productId')
  findOne(@Param('productId') productId: number) {
    return this.productService.findOne(productId);
  }

  @Put(':productId')
  update(@Param('productId') productId: number, @Body() product: Product) {
    return this.productService.update(productId, product);
  }

  @Delete(':productId')
  remove(@Param('productId') productId: number) {
    return this.productService.remove(productId);
  }
}
