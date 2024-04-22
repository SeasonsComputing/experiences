import axios from 'axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const fetch = async (
  url: string
): Promise<{ [k: string]: any }> => {
  const {
    ATMA_API_SERVER,
    ATMA_API_ORGANIZATION,
    ATMA_API_TENANT,
    ATMA_API_KEY
  } = process.env;

  const endpoint = url
    .replace('{{server}}', ATMA_API_SERVER)
    .replace('{{organization}}', ATMA_API_ORGANIZATION)
    .replace('{{tenant}}', ATMA_API_TENANT);

  const headers = {
    'Subscription-Key': ATMA_API_KEY
  };

  try {
    const { data } = await axios.get(endpoint, { headers });
    return data;
  } catch ({ response }) {
    const { status, statusText, data: detail } = response;
    if (status == 404) {
      throw new NotFoundException(detail.title);
    } else {
      throw new BadRequestException(statusText);
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

export const fetchProductQueryAllData = async (): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/attribute/product-master-data/api/v1.0/{{organization}}/{{tenant}}/products`
  );
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
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/attribute/care-label/api/v1.0/{{organization}}/{{tenant}}/documents?SKU=${productId}`
  );
}

export const fetchItemCareData = async (
  itemId: string
): Promise<{ [k: string]: any }> => {
  return await fetch(
    `{{server}}/attribute/care-label/api/v1.0/{{organization}}/{{tenant}}/labels/${itemId}/documents`
  );
}

const api = {
  fetchProductData,
  fetchProductQueryAllData,
  fetchProductCareData,
  fetchItemData,
  fetchItemCareData,
  fetchTraceData
};

export default api;