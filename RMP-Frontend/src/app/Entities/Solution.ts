export class Solution{

    solId : string;
    issId : string;
    solDescript : string;
    solRatingAvg : number;
    pos : number;

    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.solId = jsonObject.solId;
        this.issId = jsonObject.issId;
        this.solDescript = jsonObject.solDescript;
        this.solRatingAvg = jsonObject.solRatingAvg;
        this.pos = pos;
    }
}
