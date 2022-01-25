import { BsFillTrashFill, BsPencil } from "react-icons/bs"
import { useState } from "react"
import styles from "../project/ProjectsCards.module.css"
import { Link } from "react-router-dom"

function ServiceCard({ id, name, cost, description, handleRemove, handleEdit }){

  

    const remove = e => {
        e.preventDefault()
        handleRemove(id, cost)
    }
    const edit = e => {
        e.preventDefault()
        handleEdit(id, name, cost, description)
    }



    return (
        <div className={styles.projects_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>
                {description}
            </p>
            <div className={styles.projects_card_actions}>
            <Link to={`/projects/${id}/editionservice`}>
                    <BsPencil /> Editar
                </Link>
        <button onClick={remove}>
            <BsFillTrashFill />
            Excluir
        </button>
            </div>
        </div>
    )
}


export default ServiceCard