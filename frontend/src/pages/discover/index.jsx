import { getAllUsers } from '@/config/redux/action/AuthAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
          {authState.all_profiles_fetched && authState.al_}
        </div>

        </div>
      </DashboardLayout>


      </UserLayout>
    </div>
  )
}

export default DiscoverPage