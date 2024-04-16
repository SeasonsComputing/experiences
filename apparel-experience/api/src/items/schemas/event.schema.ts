import mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  itemId: String,
  eventTime: String,
  readPoint: String,
  businessLocation: String,
  geoLocation: {
    latitude: Number,
    longitude: Number,
  },
  businessTransactions: Map,
});

export const EventModel = mongoose.model('Event', EventSchema);
