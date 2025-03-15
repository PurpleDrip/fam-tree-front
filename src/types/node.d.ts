export interface IImages{
    _id:string,
    url:string
}

interface INode{
    id:string,
    type:"custom",
    data:{
        id:string,
        name:string,
        relation:string,
        gender:string,
        description:string,
        dob:string,
        role:string,
        images:Array<IImages>,
        mainImg:string,
    },
    position:{
        x:number,
        y:number,
    }
}

export default INode;
