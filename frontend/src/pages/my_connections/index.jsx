import { BASE_URL } from '@/config';
import { getMyConnectionRequests } from '@/config/redux/action/AuthAction';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./index.module.css"


const MyConnectionsPage = () => {

  const dispatch = useDispatch();
  const authState = useSelector((state)=>state.auth)
  useEffect(()=>{
    dispatch(getMyConnectionRequests({token : localStorage.getItem("token")}))
  },[])

  useEffect(()=>{
    if(authState.connectionRequest.length != 0){
      console.log(authState.connectionRequest);
      
    }
  },[authState.connectionRequest])

  return (
     <UserLayout>
         
      <DashboardLayout>
        <div>
          <h1>
            My Connections
          </h1>

          {authState.connectionRequest.length != 0 && authState.connectionRequest.map((user)=>{
            return(
               <div className={styles.userCard}>
                <div style={{display:"flex", alignItems:"center"}}>

              <div className={styles.profilePicture}>
                <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
              </div>

              <div className={styles.userInfo}>
                <h3>{user.userId.name}</h3>
                <p>{user.userId.username}</p>
              </div>

                </div>
               </div>
            )
          })}

        </div>
      </DashboardLayout>


      </UserLayout>
  )
}

export default MyConnectionsPage;