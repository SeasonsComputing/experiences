import { Facility, Checklist, Activity } from './hotel.domain';

export abstract class HotelService {
  private static readonly ENDPOINT = 'http://localhost:3001'; //'http://ec2-100-27-4-250.compute-1.amazonaws.com:3001';

  static async getFacility(): Promise<Facility> {
    let response = await fetch(`${HotelService.ENDPOINT}/facility`);
    return await response.json();
  }

  static async getChecklist(id: string): Promise<Checklist> {
    let response = await fetch(`${HotelService.ENDPOINT}/checklist/${id}`);
    return await response.json();
  }

  static async setDoNotDisturb(spaceId: string, dnd: boolean) {
    await fetch(
      `${HotelService.ENDPOINT}/dnd`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ spaceId, dnd })
    });
  }

  static async getHistory(query: { [field: string]: string} ): Promise<Activity[]> {
    // encode query into URL params
    const fields = [];
    for (const f in query) {
      fields.push(`${f}=${query[f]}`);
    }
    const params = fields.join('&');

    // fetch activity
    let response = await fetch(`${HotelService.ENDPOINT}/activity/?${params}`);
    return await response.json();
  }

  static async putActivity(a: Activity) {
    await fetch(
      `${HotelService.ENDPOINT}/activity`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(a)
    });
  }
}
