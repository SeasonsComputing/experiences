import mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  itemId: String,
  productionOrder: String,
  SKU: String,
  GTIN: String,
  ArticleNumber: String,
  ArticleName: String,
  ProductDescription: String,
  Size: String,
  Color: String,
  Price: Number,
  Currency: String,
  ProductURL: String,
  ImageURL: String,
  careId: String,
});

export const ItemModel = mongoose.model('Item', ItemSchema);
