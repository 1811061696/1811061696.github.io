import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './ProfileCard.css'




function Profilecard({location}) {

    const {user} = useSelector((state) => state.authReducer.authData)
    const posts = useSelector((state) => state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER


   
    return (  
        <div className="profileCard">
            <div className="profileImages">
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg" } alt="" />
                <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png" } alt="" />
            </div>

            <div className="profileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.story ? user.story : "Không có tiểu sử"}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Following</span>
                    </div>

                    <div className="vl"></div>

                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                                <span>Bài viết</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === 'profilePage' ? '' : <span><Link style={{textDecoration: "none", color:"inherit"}} to={`/profile/${user._id}`}>Hồ sơ của tôi</Link></span>}
        </div>
    );
}

export default Profilecard;