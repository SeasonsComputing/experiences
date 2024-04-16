import mongoose from 'mongoose';

export const CareSchema = new mongoose.Schema({
  documentId: String,
  style: String,
  season: String,
  gender: String,
  color: String,
  countryOfOrigin: String,
  instructions: [String],
  labels: [
    {
      character: String,
      description: String,
    },
  ],
  materials: [
    {
      percentage: Number,
      name: String,
    },
  ],
});

export const CareModel = mongoose.model('Care', CareSchema);
