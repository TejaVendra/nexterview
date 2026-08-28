import { createSlice } from '@reduxjs/toolkit'

const mockInterview = createSlice({
    name:"mockInterview",
    initialState:{
         selectedRole:"",
         selectedOptions:{},
         isContinue1:false,
    },
    reducers:{
        setSelectedRole(state,action){
              state.selectedRole = action.payload;
        },

        setSelectedOptions(state,action){
            const {category,value} = action.payload;

            state.selectedOptions[category] = value;
        },
        setIsContinue1(state){
        
            state.isContinue1 = !state.isContinue1;
        },
      
    }

});

export const {setSelectedRole,setSelectedOptions,setIsContinue1 } = mockInterview.actions;

export default mockInterview.reducer;