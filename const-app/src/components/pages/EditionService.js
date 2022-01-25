import {useHistory} from "react-router-dom";
import styles from "../pages/EditionProject.module.css"

function EditionService(){
    const history = useHistory();
    return (
        <div className={styles.projects_details}>
          <h1> Vamos Editar os Serviços </h1>
            <button onClick={() => history.goBack()}>Go Back</button>
        </div>
    )
}

export default EditionService