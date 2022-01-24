import { transition, animationTwo } from "."
import { motion } from "framer-motion"

function MotionPage(props){
    return (
        <motion.div
        initial="out" animate="in" exit="out" variants={animationTwo} transition={transition}
        > {props.children}</motion.div>
    )
}


export default MotionPage