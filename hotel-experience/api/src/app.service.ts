import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Facility, Space, Checklist, Activity } from './facility.domain';

import * as FacilityStore from './facility.store.json';
import * as ChecklistStore from './checklist.store.json';
import * as ActivityStore from './activity.store.json'

@Injectable()
export class AppService {
  facility: Facility = FacilityStore;
  lists: Checklist[] = ChecklistStore;
  history: Activity[] = ActivityStore;

  async getFacility(): Promise<Facility> {
    return this.facility;
  }

  async getSpaceById(id: string): Promise<Space> {
    return this.facility.spaces.find(r => r.id == id);
  }

  async setDoNotDisturb(id: string, dnd: boolean): Promise<boolean> {
    const space: Space = this.facility.spaces.find(s => s.id == id);
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
      fs.writeFileSync(__dirname + '/activity.store.json', JSON.stringify(this.history, null, 2));
    } catch (e) { 
      console.error(e);
    }
  }

  async getActivityByQuery(query: { [ field: string ]: string }): Promise<Activity[]> {
    const results: Activity[] = [];
    this.history.forEach(a => {
      let size = 0, match = 0;
      for (const f in query) {
        if (query[f] === a[f]) match++;
        size++; 
      }
      if (size && match == size) results.push(a);
    });
    return results;
  }
}
