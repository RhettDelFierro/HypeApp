import React, { PropTypes, Component} from "react"
import { Button } from 'components'
import { placeContainer } from './styles.css'


const Place = ({ open_post }) => {
        return (
            <div className={placeContainer}>
              <Button onClick={open_post} styling='postTrigger' text='Write a Review!' />
            </div>
        )
}

const { func } = PropTypes
Place.propTypes = {
  open_post: func.isRequired
}

export default Place
