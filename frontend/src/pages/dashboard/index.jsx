import { getAllPosts } from '@/config/redux/action/PostAction';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Dashboard = () => {
    const router  = useRouter();
    const dispath = useDispatch();
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
    }
  },[isTokenThere])


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard