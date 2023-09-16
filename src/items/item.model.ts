import { ItemStatus } from './item-status.enum';

export interface Item {
  id: string;
  name: string;
  prive: number;
  description: string;
  status: ItemStatus;
}
