import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import server_url from '../services/server_url'


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(Project);
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img onClick={handleShow} variant="top" src={project.image?`${server_url}/upload/${project.image}`:"https://www.axialent.com/wp-content/uploads/2018/03/AdobeStock_42639258.jpeg" }/>
                <Card.Body>
                    <Card.Title>{project?.title}</Card.Title>
                </Card.Body>
            </Card>
            {/* modal */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img className='img-fluid' src={project.image?`${server_url}/upload/${project.image}`:"https://www.axialent.com/wp-content/uploads/2018/03/AdobeStock_42639258.jpeg"} alt="img" />
                        </Col>
                        <Col>
                            <h4>{project?.title}</h4>
                            <p>{project?.overview}</p>
                            <h6>{project?.languages}</h6>
                            <div className='mt-3 p-3 d-flex justify-content-between'>
                                <a href={project.github}>
                                    <i class="fa-brands fa-github fa-xl"></i>
                                </a>
                                <a href={project.demo}>
                                <i class="fa-solid fa-link fa-xl"></i>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
              
            </Modal>
        </>
    )
}

export default ProjectCard