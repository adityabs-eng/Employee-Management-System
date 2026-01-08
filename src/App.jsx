import './App.css'
import React, { useState, useContext } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { validateCredentials } from './utils/authUtils'

const App = () => {
  // ✅ Read localStorage ONCE (outside hooks logic)
  const storedUser = localStorage.getItem("loggedInUser")
  const parsedUser = storedUser ? JSON.parse(storedUser) : null

  // ✅ Initialize state directly (NO useEffect needed)
  const [user, setUser] = useState(parsedUser?.role || "")
  const [loggedInUserData, setLoggedInUserData] = useState(parsedUser?.data || null)

  // Auth context (employees list)
  const [userData] = useContext(AuthContext)

  const handleLogin = (email, password) => {
    const result = validateCredentials(email, password, userData)

    if (result.isValid) {
      setUser(result.role)
      setLoggedInUserData(result.data)

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          role: result.role,
          data: result.data,
        })
      )
      return true
    }
    return false
  }

  const renderDashboard = () => {
    if (!user) return <Login handleLogin={handleLogin} />

    if (user === "admin") {
      return <AdminDashboard changeUser={setUser} />
    }

    if (user === "employee") {
      return (
        <EmployeeDashboard
          changeUser={setUser}
          data={loggedInUserData}
        />
      )
    }

    return null
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Toaster />
      {renderDashboard()}
    </div>
  )
}

export default App
