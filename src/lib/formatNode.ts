import INode, { IImages } from "@/types/node";

interface defaultNode{
    _id:string,
    name:string,
    relation:string,
    gender:string,
    description:string,
    dob:string,
    images:Array<IImages>,
    mainImg:string,
    role:string,
    treeId:string,
    position:{
        x:number,
        y:number,
    } 
}

export const formatNodes = (nodes: defaultNode[]): INode[] => {
    return nodes.map(node => ({
        id: node._id,
        type: "custom",
        data: {
            id: node._id,
            name: node.name || "",
            relation: node.relation || "",
            gender: node.gender || "",
            description: node.description || "",
            dob: node.dob || "",
            role: node.role || "",
            images: node.images || [],
            mainImg: node.mainImg || "",
        },
        position: node.position || { x: 0, y: 0 } 
    }));
};

export const formatNode=(node:defaultNode):INode =>{
    return {
        id: node._id,
        type: "custom",
        data: {
            id: node._id,
            name: node.name || "",
            relation: node.relation || "",
            gender: node.gender || "",
            description: node.description || "",
            dob: node.dob || "",
            role: node.role || "",
            images: node.images || [],
            mainImg: node.mainImg || "",
        },
        position: node.position || { x: 0, y: 0 } 
    }
}
