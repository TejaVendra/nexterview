import './App.css'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/sections/Navbar'

function App() {


  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)] '>

      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
      </Routes>
      
    </div>
  )
}

export default App
