import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const DiscoverPage = () => {
  const authState = useSelector((state)=>state.auth);
  const 
  useEffect(()=>{

  },[])

  return (
    <div>
        <UserLayout>
         
      <DashboardLayout>
        <div>
          <h1>
            Discover
          </h1>
        </div>
      </DashboardLayout>


      </UserLayout>
    </div>
  )
}

export default DiscoverPage