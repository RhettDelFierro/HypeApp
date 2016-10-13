import React, { PropTypes, Component} from "react"
import { postTrigger } from './styles.css'


const Button = ({ onClick, styling, text }) => {
  const style = {
    'postTrigger': postTrigger
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
