import NavbarComponent from "@/Components/Navbar";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser, registerUser } from "@/config/redux/action/AuthAction";

const LoginComponent = () => {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoginMethod,setUserLoginMethod] = useState(false);

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [name,setName] = useState("")



  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  },[authState.loggedIn]);

  const handelRegister = ()=>{
    console.log("registering");
    dispatch(registerUser({username,password,email,name}))
    
  }

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading} >{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            <p style={{color : authState.isError ? "red" : "green"}}>{authState.message?.message}</p>
            <div className={styles.inputContainers}>
              {
                !userLoginMethod &&  
                <div className={styles.inputRow}>
                 <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" className={styles.inputField} />
                  <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className={styles.inputField} />
              </div>
              }

               <input onChange={(e)=>setEmail(e.target.value)} type="Email" placeholder="Email" className={styles.inputField} />
                <input onChange={(e)=>setPassword(e.target.value)} type="Password" placeholder="Password" className={styles.inputField} />
              <div onClick={()=>{
                if(userLoginMethod){

                }else{
                  handelRegister()
                }
              }} className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            
            </div>
          
          
          </div>
          <div className={styles.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
};

export default LoginComponent;
