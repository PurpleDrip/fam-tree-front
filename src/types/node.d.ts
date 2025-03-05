interface INode{
    id:string,
    type:custom,
    data:{
        name:string,
        relationship:string,
        gender:string,
        description:string,
        dob:string,
        role:string,
        images:Array<string>,
        mainImg:string,
    },
    position:{
        x:number,
        y:number,
    }
}

export default INode;
