import React, { PropTypes, Component} from "react"
import { postTrigger, user, vote } from './styles.css'


const Button = ({ onClick, styling, text, disabled }) => {
  const style = {
    'postTrigger': postTrigger,
    'user': user,
    'vote': vote
  }
        return (
            <button className={style[styling]} onClick={onClick} disabled={disabled}>
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
