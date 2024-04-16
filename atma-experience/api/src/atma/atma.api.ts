import axios from 'axios';
import { Agent } from 'https';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const fetch = async (
  url: string,
  payload?: { [k: string]: any }
): Promise<{ [k: string]: any }> => {
  const {
    ATMA_API_SERVER,
    ATMA_API_ORGANIZATION,
    ATMA_API_TENANT,
    ATMA_API_KEY,
    ATMA_API_REJECT_UNAUTHORIZED
  } = process.env;

  const endpoint = url
    .replace('{{server}}', ATMA_API_SERVER)
    .replace('{{organization}}', ATMA_API_ORGANIZATION)
    .replace('{{tenant}}', ATMA_API_TENANT);

  const keys = {
    'Subscription-Key': ATMA_API_KEY
  };

  const atmaAgent = new Agent({
    rejectUnauthorized: ATMA_API_REJECT_UNAUTHORIZED !== 'false'
  });

  try {
    const { data } = await axios({
      method: payload ? 'post' : 'get',
      url: endpoint,
      headers: { ...keys },
      data: payload,
      httpsAgent: atmaAgent
    });
    
    return data;
  } catch ({ response, code, message }) {
    if (response?.status === 404) {
      throw new NotFoundException(message);
    } else {
      throw new BadRequestException(`[${code}] ${message}`);
    }
  }
}

export const fetchProductData = async (
  productId: string
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/attribute/product-master-data/api/v1.0/{{organization}}/{{tenant}}/products/${productId}`
  );
}

export const fetchProductQueryAllData = async (): Promise<{ [k: string]: any }[]> => {
  return await fetch(
    `{{server}}/attribute/product-master-data/api/v1.0/{{organization}}/{{tenant}}/products`
  ) as [];
}

export const fetchItemData = async (
  itemId: string
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/itemize/serialization/api/v1.0/{{organization}}/items/${itemId}`
  );
}

export const fetchTraceData = async (
  itemId: string
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/trace/track-and-trace/api/v1.0/{{organization}}/events/items/${itemId}`
  );
}

export const fetchProductCareData = async (
  productId: string
): Promise<{ [k: string]: any }[]> => {
  return await fetch(
    `{{server}}/attribute/care-label/api/v1.0/{{organization}}/{{tenant}}/documents?SKU=${productId}`
  ) as [];
}

export const fetchItemCareData = async (
  itemId: string
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/attribute/care-label/api/v1.0/{{organization}}/{{tenant}}/labels/${itemId}/documents`
  );
}

export const recordItemEvent = async (
  payload: { [k: string]: any }
): Promise<{ [k: string]: any }> => {
  return await fetch(
    '{{server}}/trace/track-and-trace/api/v1.0/{{organization}}/events/object-events',
    payload
  );
}

const api = {
  fetchProductData,
  fetchProductQueryAllData,
  fetchProductCareData,
  fetchItemData,
  fetchItemCareData,
  fetchTraceData,
  recordItemEvent
};

export default api;