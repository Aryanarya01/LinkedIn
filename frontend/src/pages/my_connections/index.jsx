import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const MyConnectionsPage = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch
  })

  return (
     <UserLayout>
         
      <DashboardLayout>
        <div>
          <h1>
            My Connections
          </h1>
        </div>
      </DashboardLayout>


      </UserLayout>
  )
}

export default MyConnectionsPage;