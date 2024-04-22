import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Facility, Space, Checklist, Activity } from './hotel.domain';

import * as FacilityStore from './stores/facility.store.json';
import * as ChecklistStore from './stores/checklist.store.json';
import * as ActivityStore from './stores/activity.store.json';

const __facility_filepath = __dirname + '/stores/activity.store.json';

type ActivityQueryParams = {
  [field: string]: string;
};

@Injectable()
export class HotelService {
  private readonly facility: Facility = FacilityStore;
  private readonly lists: Checklist[] = ChecklistStore;
  private readonly history: Activity[] = ActivityStore;

  async getFacility(): Promise<Facility> {
    return this.facility;
  }

  async getSpaceById(id: string): Promise<Space> {
    return this.facility.spaces.find(r => r.id == id);
  }

  async setDoNotDisturb(id: string, dnd: boolean): Promise<boolean> {
    const space: Space = this.facility.spaces.find(s => s.id === id);
    if (space === undefined) {
      return false;
    } else {
      space.dnd = dnd;
      return true;
    }
  }

  async getChecklistById(id: string): Promise<Checklist> {
    return this.lists.find(c => c.id === id);
  }

  async addActivity(a: Activity) {
    this.history.push(a);
    try {
      fs.writeFileSync(
        __facility_filepath,
        JSON.stringify(this.history, null, 2)
      );
    } catch (e) {
      console.error(e);
    }
  }

  async getActivityByQuery(query: ActivityQueryParams): Promise<Activity[]> {
    const results: Activity[] = [];
    this.history.forEach(a => {
      let size = 0, match = 0;
      for (const f in query) {
        if (query[f] === a[f]) match++;
        size++;
      }
      if (size > 0 && match === size) results.push(a);
    });
    return results;
  }
}
