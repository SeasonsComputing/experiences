export type Marker = {
  id: string
  to: Thing
}

export enum Type {
  item = 'i',
  product = 'p'
}

export type Thing = {
  is: Type
  id: string
}