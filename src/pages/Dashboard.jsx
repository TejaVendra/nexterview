import { signOut } from "firebase/auth"
import { auth } from "../database/firebase"
import Sidebar from "../components/sections/Sidebar"

function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Sidebar/>
      
    </div>
  )
}

export default Dashboard