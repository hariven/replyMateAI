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
import ForgotPassword from './_components/ForgotPassword'
import ResetPassword from './_components/ResetPassword'
import Features from './_components/Features'
import Pricing from './_components/Pricing'
import About from './_components/About'
import InboxPage from './inbox/InboxPage'

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

        {/* Inbox */}
        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <InboxPage />
            </PrivateRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Knowledge Base Editor */}
        <Route path="/kb-editor" element={<KnowledgeEditor />} />
        <Route path="/kb-editor/:id" element={<KnowledgeEditor />} />

        {/* Core Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
