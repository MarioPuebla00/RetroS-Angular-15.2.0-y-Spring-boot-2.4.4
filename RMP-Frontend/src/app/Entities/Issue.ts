export class Issue {

    issId : string;
    issDevTeam : string;
    issDescription : string;
    issKeyWord : string;
    issFixed : string;
    issSolution : string;
    issLastModif : string;
    pos : number;
    
    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.issId = jsonObject.issId;
        this.issDevTeam = jsonObject.issDevTeam;
        this.issDescription = jsonObject.issDescription;
        this.issKeyWord = jsonObject.issKeyWord;
        this.issFixed = jsonObject.issFixed;
        this.issSolution = jsonObject.issSolution;
        this.issLastModif = jsonObject.issLastModif;
        this.pos = pos;
    }
    

}