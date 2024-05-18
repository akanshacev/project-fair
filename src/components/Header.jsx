import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../Context Api/AuthContext';
import { useContext } from 'react';


function Header({ status }) {
  const {authStatus,setAuthStatus}= useContext(tokenAuthContext)
  const navigate= useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userDetails')
    setAuthStatus(false)
    navigate('/')
  }
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-diagram-project" style={{ color: ' #032e77' }}></i>
            {' '}
            Project Fair
          </Navbar.Brand>
          <div>
            {
              !status &&
              <button className='btn btn-outline-danger' onClick={handleLogout}>
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                Logout
              </button>
            }

          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header