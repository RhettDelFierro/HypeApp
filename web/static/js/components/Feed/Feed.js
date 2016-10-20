import React, { PropTypes, Component} from "react"
import { PostContainer, ReviewContainer } from 'containers'
import { Review } from 'components'
import { newsContainer, review } from './styles.css'


function Feed({ is_authed, is_posting, reviews, feed_elements }) {
        return (
            <div className={newsContainer}>

                {FeedElement(feed_elements)}
                <div>Some stuff => No reviews yet! Be the first!</div>

            </div>
        )
}

function FeedElement(feedProps) {
  console.log('PROPS', feedProps)
  return feedProps.map((v) => <ReviewContainer info={v} />)

}

const { bool } = PropTypes
Feed.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired,
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
