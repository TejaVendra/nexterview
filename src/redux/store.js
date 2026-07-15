import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
import navbarReducer from '../redux/slices/navBar'
const store = configureStore({
    name:"nexterview",
    reducer:{
        auth : authReducer,
          navbar: navbarReducer,

    },
})


export default store;