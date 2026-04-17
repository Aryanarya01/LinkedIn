import { getAboutUser, getAllUsers } from "@/config/redux/action/AuthAction";
import { createPost, getAllPosts } from "@/config/redux/action/PostAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";



const Dashboard = () => {
  const router = useRouter();
  const dispath = useDispatch();
  const authState = useSelector((state) => state.auth);

  const postState = useSelector((state)=> state.postReducer)



  useEffect(() => {
    if (authState.isTokenThere) {
      dispath(getAllPosts());
      dispath(getAboutUser({ token: localStorage.getItem("token") }));
    }
    if (!authState.all_profiles_fetched) {
      dispath(getAllUsers());
    }
  }, [authState.isTokenThere]);

  const [postContent,setPostContent] = useState("");
  const [fileContent,setFileContent] = useState()

    const handleUpload = async()=>{
      await dispath(createPost({file :fileContent,body:postContent}));
      setPostContent("");
      setPostContent(null)
    }

  if (authState.user) {
    return (
      <UserLayout>
        <DashboardLayout>
          
            <div className={styles.scrollComponent}>
              <div className={styles.wrapper}>
                <div className={styles.createPostContainer}>
                  <img className={styles.userProfile}
                    src={`${BASE_URL}/${authState.user.userId.profilePicture}`}
                    alt=""
                  />
                  <textarea onChange={(e)=>setPostContent(e.target.value)} value={postContent} placeholder={"What's in your mind?"} className={styles.textArea} name="" id=""></textarea>
                  <label htmlFor="fileUpload">
                    <div className={styles.Fab}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  </label>
                  <input onChange={(e)=>setFileContent(e.target.files[0])} type="file" hidden id="fileUpload" />
                  {postContent.length > 0 &&
                  <div onClick={handleUpload} className={styles.uploadButton}>Post</div>
                  }
                </div>
                  <div className={styles.postContainer}>
                      {postState.posts.map((post)=>{
                        return(
                           <div key={post._id} className={styles.singleCard}>
                            <div className={styles.singleCard_profileContainer}>
                              <img className={styles.userProfile}  src={`${BASE_URL}/${authState.user.userId.profilePicture}`} alt="" />
                              <p>{post.userId.name}</p>
                            </div>
                           </div>
                        )
                      })}
                  </div>
              </div>

            </div>
         
        </DashboardLayout>
      </UserLayout>
    );
  } else {
    return (
      <UserLayout>
        <DashboardLayout>
          <h2>Loading...</h2>
        </DashboardLayout>
      </UserLayout>
    );
  }
};

export default Dashboard;
