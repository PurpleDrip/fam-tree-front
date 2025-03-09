import axiosInstance from "@/services/axios"

interface Node{
    name: string;
    relation: string;
    gender: string;
    description: string;
    dob: string;
    images: FileList;
    role: string;
    treeId: string;
    position: {
        x: number;
        y: number;
    };
}

export const addNode = async (node: Node) => {
    return axiosInstance.post("/addnode", node);
}

export const updatePosition=async(pos:Node["position"])=>{
    return axiosInstance.post("/updateposition",pos)
}

export const changeMainImg=async(url:string,nodeId:string)=>{
    return axiosInstance.post("/changedp",{url,nodeId})
}

export const getImagesForID=async(nodeId:string)=>{
    return axiosInstance.get(`/node/getimagesbyid/${nodeId}`);
}

export const deleteNode=async(id:string)=>{
    return axiosInstance.post("/node/deletenode",{id})
}