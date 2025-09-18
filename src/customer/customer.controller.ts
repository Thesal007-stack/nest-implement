import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Customer } from './enity/customer.enity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer';
import { ResponseMessage } from 'src/pipe/response-message.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);
  constructor(private readonly customerService: CustomerService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateCustomerDto,
    description: 'Json body create customer!',
  })
  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @ApiOperation({
    summary: 'Get Customer by id',
    description: 'Get Customer data by id',
  })
  @ResponseMessage('Customer data fetched successfully')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }
}
