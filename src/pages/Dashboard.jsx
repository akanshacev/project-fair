import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { deleteProject, userProject } from '../services/allApis'
import { addProjectResponseContext } from '../Context Api/Contextapi'
import { editProjectResponseContext } from '../Context Api/Contextapi'
import { toast } from 'react-toastify'


function Dashboard() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [user, setUser] = useState("")
  const [projects, setProjects] = useState([])
  useEffect(() => {
    setUser(sessionStorage.getItem("username"))
    getData()

  }, [addProjectResponse, editProjectResponse])
  console.log(projects);

  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await userProject(header)
    if (result.status == 200) {
      setProjects(result.data)
    }
    else {
      console.log(result.response.data);
    }
  }

  const deleteData = async (id) => {
    const token = sessionStorage.getItem('token')
    console.log(id)
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteProject(id,header)
    if(result.status==200){
      toast.success("Project Deleted Successfully!")
      getData()
    }
    else{
      console.log(result)
      toast.error(result.response.data)
    }
  }
  return (
    <>
      <Header />
      <div>
        <Row>
          <Col sm={12} md={8}>
            <h2 className='text-center text-warning'>Welcome {user}</h2>
            <h3>Your Projects</h3>
            <div className='border border-3 p-4'>
              <Add />
              {
                projects.length > 0 ?
                  projects.map(item => (
                    <div className='d-flex justify-content-between shadow mb-3 p-5 rounded'>
                      <h4>{item.title}</h4>
                      <div>
                        <a href={item.github} className='btn me-3'>
                          <i class="fa-brands fa-github"></i>
                        </a>
                        <Edit project={item} />
                        <button className='btn me-3' onClick={()=>{deleteData(item?._id)}}>
                          <i className="fa-solid fa-trash" style={{ color: "#e71c0d", }} />
                        </button>
                      </div>
                    </div>
                  ))
                  :
                  <h3 className='text-center'>No Projects Available!!</h3>

              }




            </div>
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard