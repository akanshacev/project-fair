import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import { homeProject } from '../services/allApis'


function Landing() {
    const [token, setToken] = useState("")
    const [projects, setProjects] = useState([])
    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
        getHomeProjects()
    }, [])

    const getHomeProjects = async () => {
        const result = await homeProject()
        // console.log(result);
        if (result.status == 200) {
            setProjects(result.data)
        }
        else {
            console.log(result.response.data);
        }
    }
    // console.log(projects)


    return (
        <>
            <div className='w-100 p-5 align-items-center d-flex' style={{ height: "100vh", backgroundColor: 'rgb(11,172,140)' }}>
                <Row>
                    <Col className='align-items-center d-flex'>
                        <div>
                            <h1 className='display-4 mb-2 text-light'>Project Fair 2024</h1>
                            <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, nemo.
                                Natus tenetur commodi officiis vero at labore magnam, exercitationem expedita.</p>
                            {
                                token ?
                                    <Link to={'/dash'}>
                                        <button className='btn btn-success'>Manage Your Project..</button>
                                    </Link>
                                    :
                                    <Link to={'/auth'}>
                                        <button className='btn btn-success'>Start To Explore</button>
                                    </Link>

                            }


                        </div>

                    </Col>
                    <Col>
                        <img className='img-fluid' src="https://www.pngarts.com/files/7/Graphic-Web-Design-PNG-Transparent-Image.png" alt="img" />
                    </Col>
                </Row>
            </div>
            <div className='p-5 w-100'>
                <h2 className='text-center mt-4 mb-3'>Projects For You</h2>


                <marquee behavior="" direction="">
                    <div className='d-flex justify-content-evenly mt-2'>
                        {
                            projects.length>0 ?
                             projects.map(item=>(
                                <ProjectCard project={item}/>
                             ))
                             :
                             <h5>No Projects Available.....</h5>

                        }
                        
                    </div>
                </marquee>


                <div className='text-center'>
                    <Link to={'/projects'}>Click for More...</Link>
                </div>

            </div>
        </>
    )
}

export default Landing