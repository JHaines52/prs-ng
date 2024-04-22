import { User } from "./user";

export class Request{
    id: number;
    user: User;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;
  userId: any;


constructor(
    id: number = 0,
    user: User = new User(),
    description: string = "",
    justification: string = "",
    dateNeeded: Date = new Date(),
    status: string = "",
    total: number = 0,
    deliveryMode: string = "",
    submittedDate: Date = new Date(),
    reasonForRejection: string = ""
){
    this.id = id;
    this.user = user;
    this.description = description;
    this.justification = justification;
    this.dateNeeded = dateNeeded;
    this.deliveryMode = deliveryMode;
    this.status = status;
    this.total = total;
    this.submittedDate = submittedDate
    this.reasonForRejection = reasonForRejection;
}

display(): string {
     return this.id +", "+this.user.id+this.description +", "+this.justification +", "+this.dateNeeded +", "+this.deliveryMode+
    this.status +", "+this.total +", "+this.submittedDate +", "+this.reasonForRejection;
}
}