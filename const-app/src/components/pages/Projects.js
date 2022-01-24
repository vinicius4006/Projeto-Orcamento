import styles from "./Projects.module.css"
import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import Container from "../layout/Container"
import Loading  from "../layout/Loading"
import LinkButton from "../layout/LinkButton"
import ProjectsCards from "../project/ProjectsCards"
import { useState, useEffect } from "react"

function Projects(){
    //const axios = require("axios")

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectsMessage, setProjectsMessage] = useState("")

    const location = useLocation()
    let message = ""
    if(location.state){
        message = location.state.message
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then(data => {
                setProjects(data)
                setRemoveLoading(true)
        })
        .catch(err => {
            alert(err)
        })
        }, 1000)
        

    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((projects) => projects.id !== id))
            setProjectsMessage("Projeto removido com sucesso!")
        })
        .catch(err => {
            alert(err)
        })
    }


    return (
       <div className={styles.project_container}>
           <div className={styles.title_container}>
           <h1>Meus Projetos</h1>
           <LinkButton to="/newproject" text="Criar Projeto"/>
           </div>
           {message && <Message type="sucess" msg={message}/>}
           {projectsMessage && <Message type="sucess" msg={projectsMessage}/>}
           <Container customClass="start">
                {projects.length > 0 &&
                projects.map(projects => (
                    <ProjectsCards 
                    name={projects.name} 
                    id={projects.id}
                    budget={projects.budget}
                    category={projects.category.name}
                    key={projects.id}
                    handeRemove={removeProject}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
           </Container>
       </div>
    )
}


export default Projects