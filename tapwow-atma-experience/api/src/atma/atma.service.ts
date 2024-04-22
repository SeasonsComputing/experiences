import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Item, Product, Event,
  Care, Label, Material, 
  ItemAggregate, ProductAggregate
} from './atma.domain';
import api from './atma.api';

@Injectable()
export class AtmaService {
  async findProductByProductId(productId: string): Promise<Product> {
    return await api.fetchProductData(productId) as Product;
  }

  async findProductAll(): Promise<Product[]> {
    return await api.fetchProductQueryAllData() as Product[];
  }

  async findItemByItemId(itemId: string): Promise<Item> {
    const data = await api.fetchItemData(itemId);

    const {
      masterData: product,
      productionOrder
    } = data;

    return { ...product, itemId, productionOrder } as Item;
  }

  async findEventObservationsByItemId(itemId: string): Promise<Event[]> {
    const trace = await api.fetchTraceData(itemId);

    const observations: Event[] = [];

    (trace.events as any[]).forEach(e => {
      if (e.eventType === 'ObjectEvent' && e.action === 'OBSERVE') {
        const {
          eventTime, readPoint,
          businessLocation, geoLocation
        } = e;

        observations.push({
          eventTime, readPoint,
          businessLocation, geoLocation
        });
      }
    });

    observations.sort((a: Event, b: Event): number => {
      return Date.parse(b.eventTime) - Date.parse(a.eventTime);
    });

    return observations;
  }

  async findCareByProductId(productId: string): Promise<Care> {
    const data = await api.fetchProductCareData(productId) as any[];

    const care: Care[] = data;
    if (care.length < 1) {
      throw new NotFoundException();
    }
     
    return this.makeCare(care[0]);
  }

  async findCareByItemId(itemId: string): Promise<Care> {
    return this.makeCare(await api.fetchItemCareData(itemId));
  }

  protected makeCare(data: { [k: string]: any }): Care {
    const {
      documentId,
      style, season,
      gender, color,
      localizedCareSymbols: { en_EN: symbols },
      localizedCareLabelInstruction: {
        en_EN: {
          countryOfOrigin,
          careInstructions: instructions,
          garmentParts: [ { fibers } ]
        }
      }
    } = data;

    const care: Care = {
      documentId,
      countryOfOrigin,
      style, season,
      gender, color,
      instructions,
      labels: [] as Label[],
      materials: [] as Material[]
    };

    symbols && (symbols as any[]).forEach(symbol => {
      const { character, description } = symbol;
      care.labels.push({ character, description });
    });

    fibers && (fibers as any[]).forEach(fiber => {
      const { percentage, name } = fiber;
      care.materials.push({ percentage, name });
    });

    return care;
  }

  async findProductAggregateByProductId(productId: string): Promise<ProductAggregate> {
    return {
      ...await this.findProductByProductId(productId),
      care: await this.findCareByProductId(productId)
    };
  }

  async findItemAggregateByItemId(itemId: string): Promise<ItemAggregate> {
    return {
      ...await this.findItemByItemId(itemId),
      care: await this.findCareByItemId(itemId),
      trace: await this.findEventObservationsByItemId(itemId)
    };  
  }
}