import mongoose from 'mongoose';

export const MarkerSchema = new mongoose.Schema({
  tapwowId: String,
  itemId: String,
});

export const MarkerModel = mongoose.model('Marker', MarkerSchema);
