import React, { PropTypes, Component} from "react"
import { homeContainer, mapPlace, userSection } from './styles.css'
import { GoogleMapContainer } from 'containers'


const Home = (props) => {
        return (
            <div className={homeContainer}>
              <GoogleMapContainer />
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
