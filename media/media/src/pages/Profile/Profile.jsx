import PostSide from "../../components/PostSide/PostSide";
import Profilecard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import './Profile.css';


function Profile() {
    return ( 
        <div className="profile">
            <ProfileLeft />

            <div className="profile-center">
                <Profilecard  location ="profilePage"/>
                <PostSide />
            </div>

            <RightSide />
        </div>
     );
}

export default Profile;