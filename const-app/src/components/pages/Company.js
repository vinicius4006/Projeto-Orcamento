import styles from "./Company.module.css"
import LinkButton from "../layout/LinkButton"
import jupiter_logo from "../../img/jupiter_logo.png"

function Company(){
    return (
        
        <section className={styles.company_container}>
        <h1><span>Júpiter Costs</span> é <strong>Júpiter</strong> Telecomunicações</h1>
        <p>Desde <strong>1997</strong> ajudando você a se conectar da melhor forma 
            e com a maior rapidez.</p> 
         <div className={styles.pfont}>Júpiter é o maior planeta do nosso Sistema Solar e disso você já sabe<br></br> e na nossa região somos a maior fornecedora de conexão, 
             isso porque não se trata apenas de <i>serviço de internet</i> mas entregar algo que colabore para o desenvolvimento
             pessoal e profissional de todos. Somos a maior porque assim nós fizemos e construímos, e não pretendemos parar. </div>
             <p>Ao olhar para o <strong>céu</strong> saiba que há uma <strong>Júpiter</strong> pertinho de você</p>
        <LinkButton to="/contact" text="Fale Conosco"/>
        <img src={jupiter_logo} alt="Jupiter" />
    </section>
    )
}

export default Company