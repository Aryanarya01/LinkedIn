import NavbarComponent from '@/Components/Navbar'
import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LoginComponent = () => {
  const authState = useSelector((state)=>state.auth)
  const router = useRouter();
  useEffect(()=>{
    if(authState.loggedIn){
      router.push("/dashboard")
    }
  })
  return (
      <UserLayout>
        <div className={styles.cardContainer}></div>
      </UserLayout> 
  )
}

export default LoginComponent