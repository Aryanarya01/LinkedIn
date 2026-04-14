import NavbarComponent from '@/Components/Navbar'
import UserLayout from '@/layout/UserLayout'
import React from 'react'
import { useSelector } from 'react-redux'

const LoginComponent = () => {
  const authState = useSelector((state)=>state.auth)

  return (
      <UserLayout>

      </UserLayout>
  )
}

export default LoginComponent