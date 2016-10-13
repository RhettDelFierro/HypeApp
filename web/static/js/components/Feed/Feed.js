import React, { PropTypes, Component} from "react"
import { newsContainer, review } from './styles.css'


const Feed = (props) => {
        return (
            <div className={newsContainer}>
              <div className={review}>
                {'review realtime'}
              </div>
              <div className={review}>
                {'review realtime'}
              </div>
              <div className={review}>
                {'review realtime'}
              </div>
              <div className={review}>
                {'review realtime'}
              </div>
              <div className={review}>
                {'review realtime'}
              </div>
            </div>
        )
}

export default Feed
