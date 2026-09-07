import { createSlice } from "@reduxjs/toolkit";


const  profile = createSlice({
    name:"profile",
    initialState:{
        showProfilePic : false,
    },
    reducers:{

        setShowProfilePic(state){
            state.showProfilePic = !state.showProfilePic;
        },
 
    },
})

export const { setShowProfilePic } = profile.actions;

export default profile.reducer;