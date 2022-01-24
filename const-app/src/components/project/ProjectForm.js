import { useEffect, useState } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm({ handleSubmit, btnText, projectData }){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    //const [img, setImg] = useState()
    //https://digimon-api.vercel.app/api/digimon
    //https://pokeapi.co/api/v2/pokemon
   useEffect(() => {
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
            setCategories(data)
           
    })
    .catch(err => alert(err))

   }, [])

   const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
   }
   function handleChange(input){
       setProject({ ...project, [input.target.name]: input.target.value})   
   }

function handleCategory(select){
    setProject({ 
        ...project, 
        category: {
        id: select.target.value,
        name: select.target.options[select.target.selectedIndex].text,
        },
    })
}
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Nome do Projeto" 
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            name="name"
            value={project.name ? project.name: ""}
            />
            <Input 
            type="number" 
            text="Orçamento do Projeto" 
            placeholder="Insira o orçamento total do projeto"
            handleOnChange={handleChange}
            name="budget"
            value={project.budget > 0 ? project.budget : false}
            />
            <Select 
            name="category_id" 
            text="Selecione a Categoria" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ""}
            />
            
           <SubmitButton text={btnText} />
          
           
        </form>
    )
}


export default ProjectForm