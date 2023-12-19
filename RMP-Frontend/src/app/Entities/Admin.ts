export class Admin{

    admEmail : string;
    admName : string;
    admSurname : string;
    admTlf : string;
    pos : number;

    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.admEmail = jsonObject.email;
        this.admName = jsonObject.name;
        this.admSurname = jsonObject.surname;
        this.admTlf = jsonObject.tlf;
        this.pos = pos;
    }
}
