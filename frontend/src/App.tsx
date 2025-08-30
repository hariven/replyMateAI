// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import KnowledgeEditor from './_components/kb'
import Signup from './_components/Signup'
import Login from './_components/Login'
import PublicDashboard from './_components/PublicDashboard'
import PrivateRoute from './_components/PrivateRoute'
import PrivateDashboard from './_components/PrivateDashboard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
        {/* Dashboard */}
        <Route path="/" element={<PublicDashboard />} />

        {/* Private Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PrivateDashboard />
            </PrivateRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Knowledge Base Editor */}
        <Route path="/kb-editor" element={<KnowledgeEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
