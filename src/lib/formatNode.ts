import INode from "@/types/node";

export const formatNodes = (nodes: any[]): INode[] => {
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
