/* eslint-disable @typescript-eslint/unbound-method */
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const oneCustomer = {
  id: 1,
  name: 'Visal Torn',
  email: 'visal@gmail.com',
  orders: [],
};

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepository: Repository<Customer>;

  const mockCustomerRepository = {
    find: jest.fn().mockResolvedValue([oneCustomer]),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    // Add other methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get(CustomerService);
    customerRepository = module.get(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all customers with orders', async () => {
      const result = await service.findAll(); // assuming your service method is called findAll
      expect(customerRepository.find).toHaveBeenCalledWith({
        relations: ['orders'],
      });
      expect(result).toEqual([oneCustomer]);
    });
  });
  describe('createCustomer', () => {
    it('should create and save a new customer', async () => {
      const dto = { name: 'Visal Torn', email: 'visal@gmail.com' };
      const createdCustomer = { ...dto, id: 1 };

      customerRepository.create = jest.fn().mockReturnValue(createdCustomer);
      customerRepository.save = jest.fn().mockResolvedValue(createdCustomer);

      const result = await service.createCustomer(dto);

      expect(customerRepository.create).toHaveBeenCalledWith(dto);
      expect(customerRepository.save).toHaveBeenCalledWith(createdCustomer); // strict match
      expect(result).toEqual(createdCustomer);
    });
  });
});
