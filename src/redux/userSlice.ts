import IEdge from "@/types/edge";
import INode from "@/types/node";
import { ITree } from "@/types/tree";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    treeName: string;
    isRegistered: boolean;
    type:"admin" | "user" | null;
    treeId:string
}

const initialState: UserState = {
    isRegistered: false,
    treeName: "",
    type:null,
    treeId:""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registered: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload;
        },
        logout: (state) => {
            state=initialState
        },
        setInitialState:(state,action:PayloadAction<UserState>)=>{
            state.treeName=action.payload.treeName;
            state.type=action.payload.type;
            state.treeId=action.payload.treeId;
        },
    }
});

export const {
    registered,
    logout,
    setInitialState
} = userSlice.actions;

export default userSlice.reducer;
