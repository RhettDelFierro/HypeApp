import React, { PropTypes, Component} from "react"
import { postTrigger, user } from './styles.css'


const Button = ({ onClick, styling, text }) => {
  const style = {
    'postTrigger': postTrigger,
    'user': user
  }
        return (
            <button className={style[styling]} onClick={onClick} >
              {text}
            </button>
        )
}

const { func, string } = PropTypes
Button.propTypes = {
  onClick: func.isRequired,
  styling: string.isRequired
}

export default Button
