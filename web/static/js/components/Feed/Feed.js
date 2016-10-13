import React, { PropTypes, Component} from "react"
import { PostContainer } from 'containers'
import { newsContainer, review } from './styles.css'


const Feed = ({ is_authed, is_posting, reviews }) => {
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

const { bool } = PropTypes
Feed.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired
}

const ReviewFeed = ({ reviewsList }) => {
  return (
    <div>
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
