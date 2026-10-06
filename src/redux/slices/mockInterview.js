import { createSlice } from '@reduxjs/toolkit'

const mockInterview = createSlice({
    name:"mockInterview",
    initialState:{
         selectedRole:"",
         selectedOptions:{},
         isContinue1:false,
         isListening:false,
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
        setIsListening(state){
            state.isListening = !state.isListening;
        }
      
    }

});

export const {setSelectedRole,setSelectedOptions,setIsContinue1 ,setIsListening} = mockInterview.actions;

export default mockInterview.reducer;