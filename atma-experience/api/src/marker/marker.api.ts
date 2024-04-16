import axios from 'axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Type } from './marker.domain';

const fetch = async (
  url: string
): Promise<{ [prop: string]: any }> => {
  const { MARKER_API_SERVER } = process.env;
  const endpoint = url.replace('{{server}}', MARKER_API_SERVER);
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch ({ response, code, message}) {
    if (response?.status === 404) {
      throw new NotFoundException(message);
    } else {
      throw new BadRequestException(`[${code}] ${message}`);
    }
  }
}

export const fetchMarkerData = async (
  id: string
): Promise<{ [prop: string]: any }> => {
  return await fetch(`{{server}}/markers/${id}`);
}

export const fetchMarkerQueryData = async (
  type: Type
): Promise<{ [prop: string]: any }[]> => {
  return await fetch(`{{server}}/markers/?to.is=${type}`) as [];
}

const api = {
  fetchMarkerData,
  fetchMarkerQueryData
};

export default api;