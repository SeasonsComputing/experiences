import api from '../utils/api.utils'

export const useMarkerById = (id: string) => api.useFetch(`{{server}}/marker/${id}`)

const marker = {
  useMarkerById
}

export default marker