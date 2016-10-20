import React, { PropTypes, Component} from "react"
import { PostContainer, ReviewContainer } from 'containers'
import { Review } from 'components'
import { newsContainer, initialFeed } from './styles.css'


function Feed({ is_authed, is_posting, reviews, feed_elements }) {
        return (
            <div className={newsContainer}>
                {FeedElement(feed_elements)}
                {!(feed_elements.size >= 1)
                  &&
                  <div className={initialFeed}>Some stuff => No reviews yet! Be the first!</div>
                }
            </div>
        )
}

function FeedElement(feedProps) {
  return feedProps.map((v,i) => <ReviewContainer info={v} key={i}/>)
}

const { bool } = PropTypes
Feed.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired,
}

export default Feed
