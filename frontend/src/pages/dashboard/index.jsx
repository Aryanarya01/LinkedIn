import { getAboutUser } from '@/config/redux/action/AuthAction';
import { getAllPosts } from '@/config/redux/action/PostAction';
import UserLayout from '@/layout/UserLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const router  = useRouter();
    const dispath = useDispatch();
    const authState = useSelector((state)=>state.auth)

  const [isTokenThere,setIsTokenThere] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push("/login");
    }
    setIsTokenThere(true)
  }, []);

  useEffect(()=>{
    if(isTokenThere){
      dispath(getAllPosts())
      dispath(getAboutUser({token : localStorage.getItem('token')}))
    }
  },[isTokenThere])


  return (
   
      <UserLayout>
        {authState.profileFetched && <div>
            Hey {authState.user.userId.name}
          </div>}
      </UserLayout>
  )
}

export default Dashboard