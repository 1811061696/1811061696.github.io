import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSider/ProfileSider";
import RightSide from "../../components/RightSide/RightSide";
import './Home.css'

const Home = () => {
    return ( <div className="home">
        <ProfileSide />
        <PostSide />
        <RightSide />
    </div> );
}

export default Home;