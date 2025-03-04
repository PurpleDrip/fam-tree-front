export interface INode{
    name:string,
    relationship:string,
    gender:string,
    description:string,
    dob:string,
    role:string,
    images:Array<string>,
    position:{
        x:number,
        y:number,
    }
    mainImg:string,

}
