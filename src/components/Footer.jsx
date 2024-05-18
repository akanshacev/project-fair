import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    
    <>
      <div className='p-5 w-100 bg-dark'>
        <Row>
          <Col>
            <h3 className='text-light'>Project Fair 2024</h3>
            <p style={{textAlign:'justify'}} className='text-light'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
               Nisi unde laboriosam minus dolorem velit incidunt nostrum est vero consectetur sed?</p>
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='text-light'>Link</h3>
            <Link to={'/'}>Landing</Link>
            <Link to={'/auth'}>Login</Link>
            {/* <Link to={'/reg'}>Register</Link> */}
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='text-light'>Reference</h3>
            <a href="https://react.dev/" target='_blank'>React</a>
            <a href="https://react-bootstrap.github.io/" target='_blank'>React Bootstrap</a>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Footer