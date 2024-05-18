import React, { useEffect,useContext} from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { editProject } from '../services/allApis';
import { toast } from 'react-toastify';
import { editProjectResponseContext } from '../Context Api/Contextapi';

function Edit({ project }) {
    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
    console.log(project)
    const [projectData, setProjectData] = useState({
        id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo, projectImage: ""
    })
    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (projectData.projectImage) {
            if (projectData.projectImage.type == "image/jpg" || projectData.projectImage.type == "image/jpeg" || projectData.projectImage.type == "image/png") {
                setImgStatus(false)
                setPreview(URL.createObjectURL(projectData.projectImage))
            }
            else {
                setImgStatus(true)
                setPreview("")
            }
        }

    }, [projectData.projectImage])

    const handleUpload = async () => {
        console.log(projectData);
        const { title, overview, language, github, demo } = projectData
        if (!title || !overview || !language || !github || !demo) {
            toast.warning("Invalid Inputs!! Enter Valid Input Data in Every Fields!!")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("language", language)
            formData.append("github", github)
            formData.append("demo", demo)
            preview ? formData.append("image", projectData.projectImage) : formData.append("image", project.image)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editProject(projectData.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`Project ${projectData.title} Updated Successfuly!!`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else {
                    toast.warning(result.response.data)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editProject(projectData.id, formData, reqHeader)
                if (result.status == 200) {
                    toast.success(`Project ${projectData.title} Updated Successfuly!!`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else {
                    toast.warning(result.response.data)
                }
            }

        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("")
        setProjectData({
            id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo
        })
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn me-3' onClick={handleShow}>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label>
                                    <input type="file" name='' id='in' onChange={(e) => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} style={{ display: 'none' }} />
                                    <img className='img-fluid' height={'200px'} src={preview ? preview : `${base_url}/upload/${project.image}`} alt="img" />
                                </label>
                                {
                                    imgStatus &&
                                    <p className='text-danger'>Image Extention Invalid! Image should be JPG JPEG or PNG </p>
                                }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} value={projectData.title} placeholder="Project Title" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overviewinp" label="OverView">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, overview: e.target.value }) }} value={projectData.overview} placeholder="Brief about Project" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Language">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, language: e.target.value }) }} value={projectData.language} placeholder="Languages Used" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} label="GitHub Url">
                                        <Form.Control type="text" value={projectData.github} placeholder="GitHub Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} value={projectData.demo} placeholder="Demo Url" />
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleUpload}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit