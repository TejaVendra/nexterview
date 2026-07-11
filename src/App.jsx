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
import { useAuthListener } from './hooks/useAuthListener.js'

function App() {

  const dispatch = useDispatch();

  useAuthListener();

 
   const user = useSelector(state => state.auth.user)
   console.log(user)


  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)] '>

      <Navbar/>
      <Routes>
         <Route path='/' element={<><Home/></>}/>
         <Route path='/login' element={<PrivateRoute><Signin/></PrivateRoute>}/>
         <Route path='/signup' element={<Signup/>}/>
      </Routes>
       <Footer/>
      
    </div>
  )
}

export default App
