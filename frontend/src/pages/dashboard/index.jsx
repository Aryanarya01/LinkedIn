import { getAboutUser, getAllUsers } from '@/config/redux/action/AuthAction';
import { getAllPosts } from '@/config/redux/action/PostAction';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./index.module.css"
import { BASE_URL } from '@/config';
const Dashboard = () => {
    const router  = useRouter();
    const dispath = useDispatch();
    const authState = useSelector((state)=>state.auth)


  

  useEffect(()=>{
    if(authState.isTokenThere){
      dispath(getAllPosts())
      dispath(getAboutUser({token : localStorage.getItem('token')}))
    }
    if(!authState.all_profiles_fetched){
      dispath(getAllUsers())
    }
  },[authState.isTokenThere])

  if(authState.user){
  return (
   
      <UserLayout>
         
      <DashboardLayout>
        <div>
          <div className="scrollComponent">
              <div className={styles.createPostContainer}>
                <img width={200} src={`${BASE_URL}/${authState.user.userId.profilePicture}`} alt="" />
              </div>
          </div>
        </div>
      </DashboardLayout>


      </UserLayout>
  )}else{
      return(
         <UserLayout>
         
      <DashboardLayout>
       <h2>Loading...</h2>
      </DashboardLayout>


      </UserLayout>
      )
  }
}

export default Dashboard