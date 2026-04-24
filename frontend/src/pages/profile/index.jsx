import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import react, { useEffect, useState } from "react";
import styles from "./index.module.css"
import { BASE_URL } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUser } from "@/config/redux/action/AuthAction";

const ProfilePage = ()=>{
        const authState = useSelector((state)=>state.auth)
        const dispatch = useDispatch();



        const [userProfile, setUserProfile] = useState({})

        useEffect(()=>{
            dispatch(getAboutUser({token : localStorage.getItem("token")}))
        },[])

        useEffect(()=>{
            setUserProfile(authState.user)
        },[authState.user])

    return(
        <>
        <UserLayout>
            <DashboardLayout>
                {authState.user && userProfile.userId &&
                 <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img
              className={styles.backDrop}
              src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
              alt="backDrop"
            />
          </div>

          <div className={styles.profileContainer_details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <div style={{ flex: "0.8" }}>
                <div
                  style={{
                    display: "flex",
                    width: "fit-content",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}
                >
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{ color: "grey" }}>
                    @{userProfile.userId.username}
                  </p>
                </div>

                  

                <div>
                  <p>{userProfile.bio}</p>
                </div>
              </div>

              <div style={{ flex: "0.2" }}>
                <h3>Recent Activity</h3>
                {userPosts.map((post) => {
                  return (
                    <div key={post._id} className={styles.postCard}>
                      <div className={styles.card}>
                        <div className={styles.card__profileContainer}>
                          {post.media !== "" ? (
                            <img src={`${BASE_URL}/${post.media}`} alt="" />
                          ) : (
                            <div
                              style={{ height: "3.4rem", width: "3.4rem" }}
                            ></div>
                          )}
                        </div>
                        <p>{post.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.workHistory}>
            <h3>Work History</h3>
            <div className={styles.workHistoryContainer}>
              {userProfile.pastWork.map((work, index) => {
                return (
                  <div key={index} className={styles.workHistoryCard}>
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                      }}
                    >
                      {work.company}-{work.position}
                    </p>
                    <p>{work.years}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
}
            </DashboardLayout>
        </UserLayout>
        </>
    )
}

export default ProfilePage;