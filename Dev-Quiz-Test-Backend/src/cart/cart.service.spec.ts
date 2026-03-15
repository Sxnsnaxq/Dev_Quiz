import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartItem } from './cart.entity';
import { Product } from '../product/product.entity';
import { Repository } from 'typeorm';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartItem>;
  let productRepository: Repository<Product>;

  const mockCartRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockProductRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(CartItem),
          useValue: mockCartRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<CartItem>>(getRepositoryToken(CartItem));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a product to the cart', async () => {
    const product = { productId: 1, price: 100 } as Product;
    mockProductRepository.findOne.mockResolvedValue(product);
    mockCartRepository.findOne.mockResolvedValue(null);

    const cartItem = { id: 1, productId: product, quantity: 2 } as CartItem;
    mockCartRepository.save.mockResolvedValue(cartItem);

    const result = await service.addProduct(1, 2);
    expect(result).toBeDefined();
    expect(mockCartRepository.save).toHaveBeenCalled();
  });

  it('should calculate the total price', async () => {
    const cartItems = [
      { productId: { price: 100 }, quantity: 3 },
      { productId: { price: 50 }, quantity: 1 },
    ];
    mockCartRepository.find.mockResolvedValue(cartItems);

    const result = await service.calculateTotal();
    expect(result).toBe(370); // 3 * 100 * 0.9 + 1 * 50
  });

  it('should retrieve cart items', async () => {
    const cartItems = [
      { id: 1, productId: { productId: 1, price: 100 }, quantity: 2 },
    ] as CartItem[];
    mockCartRepository.find.mockResolvedValue(cartItems);

    const result = await service.getCart();
    expect(result.items).toEqual(cartItems);
    expect(result.total).toBeDefined();
  });
});
