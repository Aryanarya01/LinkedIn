import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const router  = useRouter();
       
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard