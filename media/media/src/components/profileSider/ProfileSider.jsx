import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import Profilecard from "../ProfileCard/ProfileCard";

import './ProfileSider.css'
const ProfileSide = () => {
    return ( 
        <div className="profileSide">
            <div className="profileSide">
                <LogoSearch />
                <Profilecard  location = "homepage"/>
                <FollowersCard />
            </div>
        </div>
     );
}

export default ProfileSide;