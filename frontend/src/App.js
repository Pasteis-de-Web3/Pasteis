import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom"
import About from "./pages/about"
import Hackathon from './pages/hackathon'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}


const App = () => {
  
  return (
    <div>
      <h1>Pasteis 🍮</h1>
      
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<About/>}/>
          <Route exact path="/login" element={<About/>}/>
          <Route path="/hackathon/:id" element={<Hackathon/>}/>
          <Route path="*" element={<About/>}/>
        </Routes>
        
      </Router>
    </div>
  )
}

export default App;