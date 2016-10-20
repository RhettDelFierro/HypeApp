import React, { PropTypes, Component} from "react"
import { reviewContainer } from './styles.css'

//the props are going to be the names from the channel's payload.
const Review = ({ user,body,timestamp }) => {
        return (
            <div className={reviewContainer}>
              <p>{name}</p>
              <p>{body}</p>
              <t>{timestamp}</t>
            </div>
        )
}

Review.propTypes = {

}

export default Review
