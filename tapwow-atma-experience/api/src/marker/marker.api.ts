import axios from 'axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Type } from './marker.domain'

const fetch = async (
  url: string
): Promise<{ [prop: string]: any }> => {
  const { MARKER_API_SERVER } = process.env;

  let endpoint = url.replace('{{server}}', MARKER_API_SERVER);

  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch ({ response }) {
    const { status, statusText } = response;
    if (status == 404) {
      throw new NotFoundException();
    } else {
      throw new BadRequestException(statusText);
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
): Promise<{ [prop: string]: any }> => {
  return await fetch(`{{server}}/markers/?to.is=${type}`);
}

const api = {
  fetchMarkerData,
  fetchMarkerQueryData
};

export default api;