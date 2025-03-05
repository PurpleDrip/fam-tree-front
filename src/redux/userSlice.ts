import IEdge from "@/types/edge";
import INode from "@/types/node";
import { ITree } from "@/types/tree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    treeName: string;
    isRegistered: boolean;
    nodes: Array<INode>;
    edges: Array<IEdge>;
}

const initialState: UserState = {
    isRegistered: false,
    treeName: "",
    nodes: [],
    edges: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registered: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload;
        },
        addTree: (state, action: PayloadAction<ITree | null>) => {
            state.nodes = action.payload?.nodes || [];
            state.treeName = action.payload?.treeName || "";
            state.edges = action.payload?.edges || [];
        },
        logout: (state) => {
            state.isRegistered = false;
            state.treeName = "";
            state.nodes = [];
            state.edges = [];
        },
        createdTree: (state, action: PayloadAction<string>) => {
            state.treeName = action.payload;
        },
        updateNodes: (state, action: PayloadAction<Array<INode>>) => {
            state.nodes = action.payload;
        },
        updateEdges: (state, action: PayloadAction<Array<IEdge>>) => {
            state.edges = action.payload;
        },
        updatePos: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
            const node = state.nodes.find((node) => node.id === action.payload.id);
            if (node) {
                node.position = action.payload.position;
            }
        },
        addEdge: (state, action: PayloadAction<IEdge>) => {
            state.edges.push(action.payload);
        },
        deleteNode: (state, action: PayloadAction<string>) => {
            state.nodes = state.nodes.filter((node) => node.id !== action.payload);
            state.edges = state.edges.filter((edge) => edge.source !== action.payload && edge.target !== action.payload);
        },
        deleteEdge: (state, action: PayloadAction<string>) => {
            state.edges = state.edges.filter((edge) => edge.id !== action.payload);
        },
    },
});

export const {
    registered,
    addTree,
    logout,
    createdTree,
    updateNodes,
    updateEdges,
    updatePos,
    addEdge,
    deleteNode,
    deleteEdge,
} = userSlice.actions;

export default userSlice.reducer;
