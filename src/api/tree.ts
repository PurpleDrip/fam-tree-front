import axiosInstance from "@/services/axios"
import IEdge from "@/types/edge";

export const addTree = async (treeName:string) => {
    return axiosInstance.post("/addtree", treeName);
}

export const getTree=async()=>{
    return axiosInstance.get("/tree")
}

export const getTreeById=async(id:string)=>{
    return axiosInstance.get(`/tree/${id}`)
}

export const getTreeByName=async(treeName:string)=>{
    return axiosInstance.get(`/tree/${treeName}`)
}

export const addEdge=async(edge:Partial<IEdge>)=>{
    return axiosInstance.post("/addedge", edge)
}

export const updateEdge=async(edges:Array<IEdge>)=>{
    return axiosInstance.post("/updateedge",edges)
}