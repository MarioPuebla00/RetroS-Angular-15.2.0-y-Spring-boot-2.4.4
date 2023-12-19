export class Rating{

    ratingId : string;
    solId : string;
    scoreRating : string;
    userAuthor : string;
    pos : number;

    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.ratingId = jsonObject.ratingId;
        this.solId = jsonObject.solId;
        this.scoreRating = jsonObject.scoreRating;
        this.userAuthor = jsonObject.userAuthor;
        this.pos = pos;
    }
}
