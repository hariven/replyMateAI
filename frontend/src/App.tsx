// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './_components/Dashboard'
import KnowledgeEditor from './_components/kb'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard onBusinessSelect={() => {}} />} />
      {/* <KnowledgeEditor /> */}
      <Route path='/kb-editor' element={<KnowledgeEditor />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
