import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import {addProjectResponseContext} from '../Context Api/Contextapi'

function Add() {
    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [projectData,setProjectData]=useState({
        title:"",overview:"",language:"",github:"",demo:"",ProjectImage:""
    })
    const [imageStatus,setImageStatus]=useState(false)

    useEffect(()=>{
        console.log(projectData);
        if(projectData.ProjectImage.type=="image/jpg" || projectData.ProjectImage.type=="image/jpeg" || projectData.ProjectImage.type=="image/png"){
            console.log("Image is Correct Format");
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.ProjectImage))
        }
        else{
            console.log("Invalid file format!.. Image should be jpg,jpeg,png");
            setImageStatus(true)
            setPreview("")
        }

    },[projectData.ProjectImage])

    const handleAddProject=async()=>{
        const {title,overview,language,github,demo,ProjectImage}=projectData
        if(!title || !overview || !language || !github || !demo || !ProjectImage){
            toast.warning("Invalid Inputs!! Enter Valid Input Data in Every Fields!!")
        }
        else{
            const formData= new FormData()
            formData.append("title",title)
            formData.append("overview",overview)
            formData.append("language",language)
            formData.append("github",github)
            formData.append("demo",demo)
            formData.append("image",ProjectImage)

            const token=sessionStorage.getItem("token")
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            const result=await addProject(formData,reqHeader)
            if(result.status==200){
                toast.success("Project Added Succesfuly!!")
                setProjectData({
                    title:"",overview:"",language:"",github:"",demo:"",ProjectImage:""
                })
                handleClose()
                setAddProjectResponse(result)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <button className='btn btn-info mb-4' onClick={handleShow}>Add Project</button>
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
                                <label >
                                    <input type="file" name=''  onChange={(e)=>{setProjectData({...projectData,ProjectImage:e.target.files[0]})}} style={{ display: 'none' }} />
                                    <img className='img-fluid' height={'200px'} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMzktwJntgio0Y3J-YiJBowm4q33tZJ4kTY4d6P-IwQ&s"} alt="img" />
                                </label>
                                {
                                    imageStatus &&
                                    <p className='text-danger'>Invalid File Format!! Image should jpg,jpeg,png format</p>
                                }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
                                        <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,title:e.target.value})}} placeholder="Project Title" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overviewinp" label="OverView">
                                        <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,overview:e.target.value})}} placeholder="Brief about Project" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Language">
                                        <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,language:e.target.value})}} placeholder="Languages Used" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="GitHub Url">
                                        <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,github:e.target.value})}} placeholder="GitHub Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" onChange={(e)=>{setProjectData({...projectData,demo:e.target.value})}} placeholder="Demo Url" />
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>save</Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default Add