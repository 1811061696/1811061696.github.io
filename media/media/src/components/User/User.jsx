import React, { useState } from "react";
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from "../../actions/UserAction";




function User({ person }) {

    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.authReducer.authData)

    const [following, setFollowing] = useState(person.followers.includes(user._id))

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const handleFollow = () => {
        following ? 
        dispatch(unfollowUser(person._id, user)) :
        dispatch(followUser(person._id, user))

        setFollowing((prev) => ! prev)
    }

    return ( 
        <div className="follower" key={person.id}>
            <div>
                <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png" } alt={person.name}  className="followerImg"/>
                <div className="followerName">
                    <span>{person.firstname + " " + person.lastname}</span>
                    <span>{person.username}</span>
                </div>
            </div>

            <button className={following ? "button fc-button unFollowBtn" : "button fc-button"} onClick={handleFollow}>
                {following ? "Bỏ theo dõi" : "Theo dõi"}
            </button>
        </div>
     );
}

export default User;
