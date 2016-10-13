import React, { PropTypes, Component} from "react"
import { Button } from 'components'
import { placeContainer } from './styles.css'


const Place = ({ onOpenPost }) => {
        return (
            <div className={placeContainer}>
              <Button onClick={onOpenPost} styling='postTrigger' text='Write a Review!' />
            </div>
        )
}

const { func } = PropTypes
Place.propTypes = {
  onOpenPost: func.isRequired
}

export default Place
