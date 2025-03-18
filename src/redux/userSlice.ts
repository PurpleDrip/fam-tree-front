import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    treeName: string;
    isRegistered: boolean;
    type:"admin" | "user" | null;
    treeId:string,
    value:number
}

const initialState: UserState = {
    isRegistered: false,
    treeName: "",
    type:null,
    treeId:"",
    value:0
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registered: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload;
        },
        logout: (state) => {
            state.treeName="";
            state.type=null;
            state.treeId="";
            state.isRegistered=false;
            state.value=0;
        },
        setInitialState:(state,action:PayloadAction<UserState>)=>{
            state.treeName=action.payload.treeName;
            state.type=action.payload.type;
            state.treeId=action.payload.treeId;
        },
        madeChanges:(state)=>{
            state.value+=1;
        }
    }
});

export const {
    registered,
    logout,
    setInitialState,
    madeChanges
} = userSlice.actions;

export default userSlice.reducer;
