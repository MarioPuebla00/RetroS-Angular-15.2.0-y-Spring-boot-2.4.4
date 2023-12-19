export class Meeting {

    meetId : string;
    meetDate : string;
    meetCompany : string;
    meetDevelopTeam : string;
    meetStage : string;
    pos : number;
    
    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.meetId = jsonObject.meetId;
        this.meetDate = jsonObject.meetDate;
        this.meetCompany = jsonObject.meetCompany;
        this.meetDevelopTeam = jsonObject.meetDevelopTeam;
        this.meetStage = jsonObject.meetStage;
        this.pos = pos;
    }
}