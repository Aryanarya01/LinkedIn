import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const router = useRouter();

  const authState = useSelector((state)=>state.auth)
  
  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1 style={{cursor:"pointer"}} onClick={()=>{
            router.push("/")
        }}>Pro Connect</h1>
        <div className={styles.navBar_OptionContainer}>
          

        {authState.profileFetched && <div>
           <div>
            <p>Hey, {authState.user.userId.name}</p>
           </div>
          </div>}

          
          {!authState.profileFetched &&
          <div
            onClick={() => {
              router.push("/login");
            }}
            className={styles.buttonJoin}
          >
            <p>Be a part</p>
          </div>
}

        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
