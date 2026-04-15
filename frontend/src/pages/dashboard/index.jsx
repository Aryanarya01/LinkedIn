import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const router  = useRouter();
      
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
      
    }
  },[isTokenThere])


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard