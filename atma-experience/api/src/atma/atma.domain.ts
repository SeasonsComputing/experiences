export type Product = {
  SKU: string
  GTIN: string
  ArticleNumber: string
  ArticleName: string
  ProductDescription: string
  Size: string
  Color: string
  Price: number
  Currency: string
  ProductURL: string
  ImageURL: string
}

export type ProductAggregate = Product & {
  care: Care
}

export type Item = Product & {
  itemId: string
  productionOrder: string
}

export type ItemAggregate = Item & {
  care: Care
  trace: Event[]
}

export type Event = {
  eventTime: string
  readPoint: string
  businessLocation: string
  geoLocation : {
    latitude: number
    longitude: number
  }
  businessTransactions: { [k: string]: any }
}

export type Label = {
  character: string
  description: string
}

export type Material = {
  percentage: number
  name: string
}

export type Care = {
  documentId: string
  style: string
  season: string
  gender: string
  color: string
  countryOfOrigin: string
  instructions:  string[]
  labels: Label[]
  materials: Material[]
}