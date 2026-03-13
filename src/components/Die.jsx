import './Die.css'


export default function (props){
    return(
        <button 
        style={{backgroundColor : props.isHeld? "#59E391" : "white" }}
        onClick={props.changeIsHeld}
        aria-label={`The Die value is ${props.value} ${props.isHeld ? "held" : "not held"}`} 
        >{props.value}</button>
    )
}