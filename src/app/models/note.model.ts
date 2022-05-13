import { Timestamp } from "@angular/fire/firestore";

export interface Note {
  id: string,
  title: string,
  description: string,
  date: Timestamp,
  archived: boolean
}
