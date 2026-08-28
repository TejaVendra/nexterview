import { createSlice } from '@reduxjs/toolkit'

const mockInterview = createSlice({
    name:"mockInterview",
    initialState:{
         selectedRole:"",
         selectedOptions:{},
         isContinue1:false,
         isLoading1:false,
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
            state.isLoading1 = 'true';
            state.isContinue1 = !state.isContinue1;
        },
        setIsLoading1(state){
            state.isLoading1 = !state.isLoading1;
        }
    }

});

export const {setSelectedRole,setSelectedOptions,setIsContinue1 , setIsLoading1} = mockInterview.actions;

export default mockInterview.reducer;