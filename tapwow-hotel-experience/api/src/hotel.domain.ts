export type Facility = {
  id: string;
  label: string;
  spaces: Space[];
};

export type Space = {
  id: string;
  label: string;
  dnd: boolean;
  tags: string[];
};

export type Checklist = {
  id: string;
  label: string;
  introduction?: string;
  warning?: string;
  sections: Section[];
};

export enum SectionType {
  completedList = 'completed',
  rangeList = 'range'
};

export type Section = {
  id: string;
  label: string;
  type: SectionType | string;
  items: Item[];
};

export type Item = {
  id: string;
  label: string;
  action?: string;
};

export enum ActivityStatus {
  initiated = 'initiated',
  completed = 'completed',
  dnd = 'dnd',
  abandoned = 'abandoned'
};

export type ActivityTuple = {
  [key: string]: string;    // '{sectionId}/{itemId}' : 'value'
};

export type Activity = {
  facilityId: string;
  spaceId: string;
  listId: string;
  deviceId: string;
  tagId: string;
  start: Date;
  finish: Date;
  status: ActivityStatus | string;
  actions: ActivityTuple;
};
