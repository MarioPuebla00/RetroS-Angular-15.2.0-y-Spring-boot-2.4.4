export class User {

    userEmail : string;
    userName : string;
    userSurname : string;
    userTlf : string;
    userRol : string;    
    userCompany : string;
    userDevT : string;
    userSupervisor : boolean;
    pos : number;
    
    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.userEmail = jsonObject.email;
        this.userName = jsonObject.name;
        this.userSurname = jsonObject.surname;
        this.userTlf = jsonObject.tlf;
        this.userCompany = jsonObject.company;
        this.userDevT = jsonObject.developTeam;
        this.userSupervisor = jsonObject.supervisor;
        this.userRol = jsonObject.rol;
        this.pos = pos;
    }
}

