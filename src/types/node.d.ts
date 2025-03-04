interface INode{
    id:string
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

export default INode;
