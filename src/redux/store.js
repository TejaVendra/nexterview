import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'
import navbarReducer from '../redux/slices/navBar'
import sidebarReducer from '../redux/slices/sideBar.js'
const store = configureStore({
    name:"nexterview",
    reducer:{
        auth : authReducer,
        navbar: navbarReducer,
        sidebar:sidebarReducer,

    },
})


export default store;