import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice.js'
import navbarReducer from '../redux/slices/navBar.js'
import sidebarReducer from '../redux/slices/sideBar.js'
import mockInterviewReducer from '../redux/slices/mockInterview.js'
const store = configureStore({
    name:"nexterview",
    reducer:{
        auth : authReducer,
        navbar: navbarReducer,
        sidebar:sidebarReducer,
        mockInterview:mockInterviewReducer

    },
})

export default store;