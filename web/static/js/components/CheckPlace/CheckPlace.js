import React, { PropTypes, Component } from "react"
import { PlaceContainer, PostContainer, FeedContainer, AuthenticatedContainer } from 'containers'
import { checkPlaceContainer } from './styles.css'


const CheckPlace = ({ is_authed, is_posting }) => {
        return (
            <div className={checkPlaceContainer}>
              <PlaceContainer />
              {is_authed && is_posting
                ? AuthenticatedContainer(PostContainer)
                : <FeedContainer />
              }
            </div>
        )
}

const { bool } = PropTypes
CheckPlace.propTypes = {
  is_authed: bool.isRequired,
  is_posting: bool.isRequired
}

export default CheckPlace
