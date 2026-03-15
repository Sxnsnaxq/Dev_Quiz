import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = { name: 'Test Product', price: 100, description: 'Test Desc' } as Product;
    mockProductRepository.save.mockResolvedValue(product);

    const result = await service.create(product);
    expect(result).toEqual(product);
    expect(mockProductRepository.save).toHaveBeenCalledWith(product);
  });

  it('should retrieve all products with pagination', async () => {
    const products = [{ id: 1, name: 'Test Product', price: 100, description: 'Test Desc' }];
    mockProductRepository.findAndCount.mockResolvedValue([products, 1]);

    const result = await service.findAll(1, 10);
    expect(result).toEqual({ data: products, total: 1 });
    expect(mockProductRepository.findAndCount).toHaveBeenCalledWith({ skip: 0, take: 10 });
  });

  it('should throw an error when product is not found', async () => {
    mockProductRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow('Product with ID 1 not found');
  });

  it('should update a product', async () => {
    const product = { id: 1, name: 'Updated Product', price: 150, description: 'Updated Desc' };
    mockProductRepository.findOne.mockResolvedValue(product);

    await service.update(1, product);
    expect(mockProductRepository.update).toHaveBeenCalledWith(1, product);
  });

  it('should delete a product', async () => {
    const product = { id: 1, name: 'Test Product', price: 100, description: 'Test Desc' };
    mockProductRepository.findOne.mockResolvedValue(product);

    await service.remove(1);
    expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
  });
});
