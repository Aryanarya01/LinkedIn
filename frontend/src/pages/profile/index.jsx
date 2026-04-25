import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import react, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { BASE_URL, clientServer } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUser } from "@/config/redux/action/AuthAction";
import { useRouter } from "next/router";
import { getAllPosts } from "@/config/redux/action/PostAction";

const ProfilePage = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const postReducer = useSelector((state) => state.postReducer);

  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOper] = useState(false);
  const [inputData, setInputdata] = useState({
    company: "",
    position: "",
    years: "",
  });

  const handelWorkInputChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputData, [name]: value });
  };

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (authState.user != undefined) {
      setUserProfile(authState.user);
      let post = postReducer.posts.filter((post) => {
        return post.userId.username === authState.user.userId.username;
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);

  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      "/upload_profile_picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  const updateProfileData = async () => {
    await Promise.all([
      clientServer.post("/user_update", {
        token: localStorage.getItem("token"),
        name: userProfile?.userId?.name,
      }),

      clientServer.post("/update_profile_data", {
        token: localStorage.getItem("token"),
        bio: userProfile.bio,
        currentPost: userProfile.currentPost,
        pastWork: userProfile.pastWork,
        education: userProfile.education,
      }),
    ]);
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  return (
    <>
      <UserLayout>
        <DashboardLayout>
          {authState.user && userProfile.userId && (
            <div className={styles.container}>
              <div className={styles.backDropContainer}>
                <label
                  htmlFor="profilePictureUpload"
                  className={styles.backDrop__overlay}
                >
                  <p>Edit</p>
                </label>
                <input
                  onChange={(e) => {
                    uploadProfilePicture(e.target.files[0]);
                  }}
                  hidden
                  type="file"
                  id="profilePictureUpload"
                />
                <img
                  className={styles.backDrop}
                  src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                  alt="backDrop"
                />
              </div>

              <div className={styles.profileContainer_details}>
                <div
                  className={styles.profileContainer_flex}
                  style={{ display: "flex", gap: "0.7rem" }}
                >
                  <div style={{ flex: "0.8" }}>
                    <div
                      style={{
                        display: "flex",
                        width: "fit-content",
                        alignItems: "center",
                        gap: "1.2rem",
                      }}
                    >
                      <input
                        className={styles.nameEdit}
                        type="text"
                        value={userProfile.userId.name}
                        onChange={(e) => {
                          setUserProfile({
                            ...userProfile,
                            userId: {
                              ...userProfile.userId,
                              name: e.target.value,
                            },
                          });
                        }}
                      />

                      <p style={{ color: "grey" }}>
                        @{userProfile.userId.username}
                      </p>
                    </div>

                    <div>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => {
                          setUserProfile({
                            ...userProfile,
                            bio: e.target.value,
                          });
                        }}
                        rows={Math.max(
                          3,
                          Math.ceil(userProfile.bio.length / 80),
                        )} // Adjusted as needed
                        style={{ width: "100%" }}
                      />
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

                  <button
                    className={styles.addWorkButton}
                    onClick={() => {
                      setIsModalOper(true);
                    }}
                  >
                    Add Work
                  </button>
                </div>
              </div>
              {userProfile != authState.user && (
                <div
                  onClick={() => {
                    updateProfileData();
                  }}
                  className={styles.updateProfileBtn}
                >
                  Update Profile
                </div>
              )}
            </div>
          )}

          {isModalOpen && (
            <div
              onClick={() => {
                setIsModalOper(false);
              }}
              className={styles.commentsContainer}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={styles.allCommentsContainer}
              >
                <input
                  onChange={handelWorkInputChange}
                  name="company"
                  type="text"
                  placeholder="Enter Company"
                  className={styles.inputField}
                />
                <input
                  onChange={handelWorkInputChange}
                  name="position"
                  type="text"
                  placeholder="Enter Position"
                  className={styles.inputField}
                />
                <input
                  onChange={handelWorkInputChange}
                  name="years"
                  type="number"
                  placeholder="Years"
                  className={styles.inputField}
                />
                <div
                  onClick={() => {
                    setUserProfile({
                      ...userProfile,
                      pastWork: [...userProfile.pastWork, inputData],
                    });
                    setIsModalOper(false);
                  }}
                  className={styles.updateProfileBtn}
                >
                  Add Work
                </div>
              </div>
            </div>
          )}


          <div className={styles.workHistory}>
            <h3>Education</h3>
            <div className={styles.workHistoryContainer}>
              {userProfile.education.map((study)=>{
                return(
                  <div className="workHistoryCard"></div>
                )
              })}
            </div>
          </div>


        </DashboardLayout>
      </UserLayout>
    </>
  );
};

export default ProfilePage;
