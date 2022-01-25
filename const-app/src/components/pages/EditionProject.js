import { parse, v4 as uuidv4 } from "uuid"

import styles from "../pages/EditionProject.module.css"

import {useParams} from "react-router-dom"
import { useState, useEffect } from "react"

import api from "../../api"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm"
import MotionPage from "../../animations/MotionPage"
import Message from "../layout/Message"
import ServiceForm from "../services/ServiceForm"
import ServiceCard from "../services/ServiceCard"

function EditionProject(){

    const { id } = useParams() //Consigo pegar o id do meu projeto
    const[project, setProject] = useState([])
    const[services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [editGo, setEditGo] = useState(false)

    //substituir o fetch pelo axios, lembrando que atualiza e ele não entra
    
    useEffect(() => {
        setTimeout(() => {
            api
           .get(`/projects/${id}`)
            .then((response) => {
                setProject(response.data)
                setServices(response.data.services)
            })
            .catch((err) => {
                console.error(err)
       })
        }, 1000)
         

    }, [id])

    function editPost(project){
        setMessage("")
       //budget validation
        if(project.budget < project.cost){
                setMessage("O orçamento não pode ser menor que o custo do projeto!")
                setType(false)
                return false
        }

          //api
           // .patch(`projects/${id}`)
           // .then((resp) => {
           //    setProject(resp.data)
             //   setShowProjectForm(false)
            //})
          //  .catch(err => {
           //     alert(err)
          //  })

            fetch(`http://localhost:5000/projects/${id}`, {
               method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(project)
           })
           .then((resp) => resp.json())
           .then((data) => {
               setProject(data)
               setShowProjectForm(false)
               setMessage("Projeto atualizado")
                setType("sucess")
                
           })
           .catch(err => {
               alert(err)
           })
    }
    function createService(){
        setMessage("")

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            project.services.pop()
            return false
        }

        // add service cost to project total cost

        project.cost = newCost

        //update cost
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            //exibir o serviço
            console.log(data)
            setShowServiceForm(false)
        })
        .catch(err => alert(err))

            
    }
    function removeService(id,cost){
        setMessage("")
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
            const projectUpdated = project
            projectUpdated.services = servicesUpdated
            projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

            fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projectUpdated)
            })
            .then(resp => {
                resp.json()
            })
            .then(() => {
                 setProject(projectUpdated)
                 setServices(servicesUpdated)
                 setMessage("Serviço removido com sucesso!")
                 setType("sucess")
            })
            .catch(err => alert(err))
    }

    function editService(id, cost, name, description){
      setEditGo(true)
    }
    function toogleProjectForm(){
        
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return (
       <>
        {project.name ? (
            <div className={styles.projects_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toogleProjectForm} className={styles.btn}>
                            {!showProjectForm ? "Editar projeto" : "Fechar"}</button>
                            {!showProjectForm ? (
                                
                                <div className={styles.project_info}>
                                    <p>
                                     <span>Categoria: </span>{project.category.name}   
                                         </p>
                                    <p>
                                     <span>Total de Orçamento: </span>R${project.budget}   
                                         </p>
                                    <p>
                                     <span>Total Utilizado: </span>R${project.cost}   
                                     </p>
                                    
                                </div>
                                
                            ) : (
                                <div className={styles.project_info}>
                                    <MotionPage>
                                    <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição" 
                                    projectData={project}
                                    />
                                    </MotionPage>
                                </div>
                            )}
                    </div>
                   
                    <div className={styles.service_form_container}>
                                <h2>Adicione um serviço:</h2>
                                <button onClick={toogleServiceForm} className={styles.btn}>
                                     {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                                         </button>
                                         
                    <div className={styles.project_info}>
                        
                                {showServiceForm && <MotionPage><div>
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}
                                    />
                                     
                                    </div></MotionPage>}
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                           {
                               services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    key={service.id}
                                    description={service.description}
                                    handleRemove={removeService}
                                    handleEdit={editService}
                                    
                                    />
                                    
                                ))
                           }
                           
                           {
                               services.length === 0 && <p>Não há serviços cadastrados</p>
                           }
                    </Container>
                    </div>
                  
                </Container>
            </div>
        ): (
            <Loading />
        )}
       </>
    )
}


export default EditionProject
