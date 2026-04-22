import { getAllUsers } from '@/config/redux/action/AuthAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./index.module.css"
import { BASE_URL } from "@/config";



const DiscoverPage = () => {
  const authState = useSelector((state)=>state.auth);
  const dispath = useDispatch();

  useEffect(()=>{
    if(!authState.all_profiles_fetched){
      dispath(getAllUsers())
    }
  },[])

  return (
    <div>
        <UserLayout>
         
      <DashboardLayout>
        <div>
          <h1>
            Discover
          </h1>

        <div className={styles.allUserProfile}>
          {authState.all_profiles_fetched && authState.all_users.map((user)=>{
            return(
              <div key={user._id} className={styles.userProfile}>
                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="Profile"/>
                    <h1>{user.userId.name}</h1>
                    <p>{user.userId.username}</p>
              </div>
            )
          })}
        </div>

        </div>
      </DashboardLayout>


      </UserLayout>
    </div>
  )
}

export default DiscoverPage;