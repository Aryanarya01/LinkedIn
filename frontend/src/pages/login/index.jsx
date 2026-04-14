import NavbarComponent from "@/Components/Navbar";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

const LoginComponent = () => {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [userLoginMethod,setUserLoginMethod] = useState(false);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  });
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading} >{userLoginMethod ? "Sign In" : "Sign Up"}</p>
          
            <div className={styles.inputContainers}>
              <div className={styles.inputRow}>
                 <input type="text" placeholder="Username" className={styles.inputField} />
                  <input type="text" placeholder="Name" className={styles.inputField} />
              </div>

               <input type="Email" placeholder="Email" className={styles.inputField} />
                <input type="Password" placeholder="Password" className={styles.inputField} />
            </div>
          
          
          </div>
          <div className={styles.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
};

export default LoginComponent;
