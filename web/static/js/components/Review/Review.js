import React, { PropTypes, Component} from "react"
import { reviewContainer } from './styles.css'

//the props are going to be the names from the channel's payload.
const Review = ({ user, body, timestamp }) => {
        return (
            <div className={reviewContainer}>
              <p><span>{user}</span></p>
              <p>{body}</p>
              <p>{timestamp}</p>
            </div>
        )
}

Review.propTypes = {

}

export default Review
