import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { 
  Product, Item, Event, Care, 
  ItemAggregate, ProductAggregate 
} from './atma.domain';
import { AtmaService } from './atma.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly atma: AtmaService) {}

  @Get(':productId')
  async findProductByProductId(
    @Param('productId') productId: string
  ): Promise<Product> {
    return await this.atma.findProductByProductId(productId);
  }

  @Get('care/:productId')
  async findCareByProductId(
    @Param('productId') productId: string
  ): Promise<Care> {
    return await this.atma.findCareByProductId(productId);
  }

  @Get('aggregate/:productId')
  async findProductAggregateByProductId(
    @Param('productId') productId: string
  ): Promise<ProductAggregate> {
    return await this.atma.findProductAggregateByProductId(productId);
  }

  @Get('query/all')
  async findProductAll(): Promise<Product[]> {
    return await this.atma.findProductAll();
  }
}

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly atma: AtmaService) {}

  @Get(':itemId')
  async findItemByItemId(
    @Param('itemId') itemId: string
  ): Promise<Item> {
    return await this.atma.findItemByItemId(itemId);
  }
  
  @Get('trace/:itemId')
  async findEventObservationsByItemId(
    @Param('itemId') itemId: string
  ): Promise<Event[]> {
    return await this.atma.findEventObservationsByItemId(itemId);
  }

  @Get('care/:itemId')
  async findCareByItemId(
    @Param('itemId') itemId: string
  ): Promise<Care> {
    return await this.atma.findCareByItemId(itemId);
  }

  @Get('aggregate/:itemId')
  async findItemAggregateByItemId(
    @Param('itemId') itemId: string
  ): Promise<ItemAggregate> {
    return await this.atma.findItemAggregateByItemId(itemId);
  }
}