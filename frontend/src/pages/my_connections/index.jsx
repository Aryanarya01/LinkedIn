import { getMyConnectionRequests } from '@/config/redux/action/AuthAction';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

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
        </div>
      </DashboardLayout>


      </UserLayout>
  )
}

export default MyConnectionsPage;