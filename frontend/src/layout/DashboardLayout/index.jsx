import React from 'react'
import styles from "./index.module.css"
const DashboardLayout = ({children}) => {
  return (
    <div> 
         <div className={styles.container}>

            <div className={styles.homeContainer}>

                <div className={styles.homeContainer__leftBar}>

                    <div className={styles.sideBarOptions}></div>

                </div>

                 <div className={styles.homeContainer__feedContainer}>
                {children}
            </div>

            <div className={styles.homeContainer__extraContainer}>

            </div>

            </div>

            

      </div>
    </div>
  )
}

export default DashboardLayout