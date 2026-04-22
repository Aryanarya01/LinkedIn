import { clientServer } from '@/config'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ViewProfilePage = () => {
    const searchParames = useSearchParams()

    useEffect(()=>{
      console.log("From View : View Profile")
    })

  return (
    <div>ViewProfilePage</div>
  )
}

export default ViewProfilePage

export async function getServerSideProps(context) {
    console.log("view")
    console.log(context.query.username);
    
  const request = await clientServer.get("/user/get_profile_based_on_username",{
    params : {
      username : context.query.username
    }
  })

    return {props: {}}
}