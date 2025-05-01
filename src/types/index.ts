export interface EventTypes {
  _id: string;
  name: string;
  description: string;
  organizer : string;
  maxParticipants : number;
  date: Date;
  deadline : Date;
  category : string;
  location: string;
  endDate : Date;
  time : string;
  guests : string[];
  image: string;
} 