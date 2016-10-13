import React, { PropTypes, Component} from "react"
import { homeContainer, mapPlace, userSection } from './styles.css'


const Home = (props) => {
        return (
            <div className={homeContainer}>
              <div className={mapPlace}>
                {'yo!'}
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
              <div className={userSection}>
                {'review realtime'}
              </div>
            </div>
        )
}

Home.propTypes = {

}

export default Home
