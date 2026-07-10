import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
const store = configureStore({
    name:"nexterview",
    reducer:{
        auth : authReducer
    },
})


export default store;