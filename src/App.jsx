import './App.css'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/sections/Navbar'
import { Signin } from './components/access/Signin.jsx'
import {Signup} from './components/access/Signup.jsx'
import Footer from './components/sections/Footer.jsx'
import { onAuthStateChanged  } from 'firebase/auth'
import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import { auth } from './database/firebase.js'
import { setUser } from './redux/slices/authSlice.js'
import { useSelector } from 'react-redux'
import PrivateRoute from './routes/PrivateRoutes.jsx'
import PublicRoute from './routes/PublicRoutes.jsx'
import { useAuthListener } from './hooks/useAuthListener.js'
import Dashboard from './pages/Dashboard.jsx'

function App() {

  const dispatch = useDispatch();

  useAuthListener();

 
   const user = useSelector(state => state.auth.user)
   console.log(user)


  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)] '>

      <Navbar/>
      <Routes>
         <Route path='/' element={<PublicRoute><Home/></PublicRoute>}/>
         <Route path='/login' element={<PublicRoute><Signin/></PublicRoute>}/>
         <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
         <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes>
       <Footer/>
      
    </div>
  )
}

export default App
