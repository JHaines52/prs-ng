export class User{
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    reviewer: boolean;
    admin: boolean;
    isAdmin?: boolean;
    profilePhoto: string;

constructor(
    id: number = 0,
    username: string = "",
    password: string = "",
    firstname: string = "",
    lastname: string = "",
    phone: string = "",
    email: string = "",
    reviewer: boolean = false,
    admin: boolean = false,
    profilePhoto: string = "",
){
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.reviewer = reviewer;
    this.admin = admin;
    this.profilePhoto = profilePhoto;
}
details(): string{
    return `User id ${this.id}: ${this.firstname} ${this.lastname} phone: ${this.phone} email: ${this.email}`;
}



}