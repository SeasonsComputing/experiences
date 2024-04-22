export type Item = {
  itemId: string
  productionOrder: string
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

export type ItemAggregate = {
  item: Item
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

export type Care = {
  documentId: string
  style: string
  season: string
  gender: string
  color: string
  countryOfOrigin: string
  instructions:  string[]
  labels: [
    {
      character: string
      description: string
    }
  ]
  materials: [
    {
      percentage: number
      name: string
    }
  ]
}