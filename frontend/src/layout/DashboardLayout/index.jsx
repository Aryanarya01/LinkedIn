import React from 'react'

const DashboardLayout = ({children}) => {
  return (
    <div> 
         <div className="container">

            <div className="homeContainer">

                <div className="homeContainer__leftBar">
                    
                </div>

            </div>

            <div className="feedContainer">
                {children}
            </div>

            <div className="extraContainer">

            </div>

      </div>
    </div>
  )
}

export default DashboardLayout