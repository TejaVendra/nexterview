import './App.css'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/sections/Navbar'
import { Signin } from './components/access/Signin.jsx'
import {Signup} from './components/access/Signup.jsx'
import Footer from './components/sections/Footer.jsx'
function App() {


  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)] '>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Signin/>}/>
         <Route path='/signup' element={<Signup/>}/>
      </Routes>
       <Footer/>
      
    </div>
  )
}

export default App
