import './env';

import mongoose from 'mongoose';
import { ItemModel } from './items/schemas/item.schema';
import { CareModel } from './items/schemas/care.schema';
import { EventModel } from './items/schemas/event.schema';
import { MarkerModel } from './items/schemas/marker.schema';

import * as item_1 from './items/seeds/item_1.json';
import * as item_2 from './items/seeds/item_2.json';
import * as item_3 from './items/seeds/item_3.json';
import * as item_4 from './items/seeds/item_4.json';
import * as item_5 from './items/seeds/item_5.json';

const main = async () => {
  const { DB_CONNECTION_URI } = process.env;
  console.log(`Loading seed items into db: ${DB_CONNECTION_URI}`);

  await mongoose.connect(DB_CONNECTION_URI);

  let count = 0;
  const promises = [];
  const records = [item_1, item_2, item_3, item_4, item_5];

  for (const data of records) {
    const { care, trace, ...item } = data;
    const { itemId } = item;

    const i = new ItemModel({ ...item, careId: care.documentId });
    promises.push(i.save());

    const c = new CareModel(care);
    promises.push(c.save());

    trace.forEach(t => {
      const e = new EventModel({ ...t, itemId });
      promises.push(e.save());
    });

    const m = new MarkerModel({ tapwowId: `item_${++count}`, itemId });
    promises.push(m.save());
  }

  await Promise.all(promises);

  console.log(`${count} items loaded successfuly.`);
};

main()
  .then(() => process.exit())
  .catch((err) => console.log(err));
