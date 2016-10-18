import React, { PropTypes, Component} from "react"
import { homeContainer, mapPlace, userSection } from './styles.css'
import { GoogleMap } from 'components'


const Home = (props) => {
        return (
            <div className={homeContainer}>
              <GoogleMap />
              <div className={userSection}>
                {'review realtime'}
              </div>
              <div className={userSection}>
                {'review realtime'}
              </div>
              <div className={userSection}>
                {'review realtime'}
              </div>
              <div className={userSection}>
                {'review realtime'}
              </div>
              <div className={userSection}>
                {'review realtime'}
              </div>
            </div>
        )
}

Home.propTypes = {

}

export default Home
