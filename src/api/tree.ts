import axiosInstance from "@/services/axios"
import IEdge from "@/types/edge";
import INode from "@/types/node";

export const createTree = async (treeName:string) => {
    return axiosInstance.post("/addtree", {treeName});
}

export const getTree=async()=>{
    return axiosInstance.get("/tree")
}

export const getTreeById=async(id:string)=>{
    return axiosInstance.get(`/tree/${id}`)
}

export const getTreeByName=async(treeName:string)=>{
    return axiosInstance.get(`/treebyname/${treeName}`)
}

export const addEdge=async(edge:Partial<IEdge>)=>{
    return axiosInstance.post("/addedge", edge)
}

export const updateEdge=async(edges:Array<IEdge>)=>{
    return axiosInstance.post("/updateedge",edges)
}

export const updateTree=async(nodes:Array<INode>,edges:Array<IEdge>)=>{
    return axiosInstance.put("/updatetree",{nodes,edges})
}