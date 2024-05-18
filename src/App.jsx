import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { Route,Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Reg from './pages/Reg'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { tokenAuthContext } from './Context Api/AuthContext'
import { useContext } from 'react'

function App() {
  const {authStatus,setAuthStatus}=useContext(tokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}/>
      <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}/>
      <Route path='/log' element={<Login/>}/>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
