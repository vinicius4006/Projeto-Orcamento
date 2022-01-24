import { Link } from "react-router-dom"



import styles from "./ProjectsCards.module.css"
import {BsPencil, BsFillTrashFill} from "react-icons/bs"


function ProjectsCards({id, name, budget, category, handeRemove}){
    

    const remove = (e) => {
        e.preventDefault()
        handeRemove(id)
       
        
    }

    return(
        <div className={styles.projects_card}>
          <h4>{name}</h4>
            <p>
                <span>Orçamento: </span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.projects_card_actions}>
                <Link to="/">
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
      

    )
}

export default ProjectsCards