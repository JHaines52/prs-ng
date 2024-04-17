export class Vendor {
    id: number;
    code: string;
    name: string;
    address: string;
    city: string;
    region: string;
    zip: string;
    phone: string;
    email: string;


constructor(
    id: number = 0,
    code: string = "",
    name: string = "",
    address: string = "",
    city: string = "",
    region: string = "",
    zip: string = "",
    phone: string= "",
    email: string = ""
){
    this.id = id;
    this.code = code;
    this.name = name;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.email = email;
    this.region = region;
    this.zip = zip;
}



}
