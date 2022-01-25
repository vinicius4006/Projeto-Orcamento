import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import styles from "./Footer.module.css"


function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href="https://pt-br.facebook.com/jupitertelecom/" target="_blank">
                        <FaFacebook />
                        </a>
                    
                </li>
                <li>
                    <a href="https://www.instagram.com/jupitertelecom/?hl=pt" target="_blank">
                    <FaInstagram />
                    </a>
                </li>
                <li>
                    <a href="https://br.linkedin.com/company/jupiter-informatica" target="_blank">
                    <FaLinkedin />
                    </a>
                    
                </li>
            </ul>
            <p className={styles.copy_right}>
                Copyright &copy;2022 <span>Júpiter Telecomunicações</span>. Todos os direitos reservados. 
            </p>
        </footer>
    )
}

export default Footer