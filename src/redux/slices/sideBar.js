import { createSlice  } from "@reduxjs/toolkit";

const sidebar = createSlice({
    name:"sidebar",
    initialState:{
        isSidebarOpen:true,
    },
    reducers:{
        setSidebarOpen(state){
            state.isSidebarOpen =!state.isSidebarOpen;
        }
    }
})

export const { setSidebarOpen } = sidebar.actions;

export default sidebar.reducer;