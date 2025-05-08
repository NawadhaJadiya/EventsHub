
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

};

export interface RegistrationTypes{
  time : Date
  name : string
  phoneNumber : number
  email : string
  enrollmentNumber : string
  year : number
  course : string
  branch : string
  attended : boolean
}