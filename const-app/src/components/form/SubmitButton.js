import styles from "./SubmitButton.module.css"


function SubmitButton({ text }){
    return (
        <button className={styles.subtn_control}>
            {text}
        </button>

        
    )
}

export default SubmitButton