import { useEffect, useState } from "react";
import './Post.css';

import { useSelector } from "react-redux";
import { likePost } from "../../api/PostsRequests";
import Comment from '../../img/comment.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import Share from '../../img/share.png';


import {getUser} from '../../api/UserRequests'


function Post({data}) {
    const { user } = useSelector((state) => state.authReducer.authData);
    

    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length)
    


    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        
        liked ? setLikes((preve) => preve - 1) : setLikes((preve) => preve + 1)
    }

    
   
    return ( 
        <div className="post">
            <img
                src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
                alt=""  
            />

            <div className="potsReact">
            <img
             src={liked ? Heart : NotLike }
             alt=""
             style={{ cursor: "pointer" }}
             onClick={handleLike}
            />
                <img src={ Comment } alt="" />
                <img src={ Share } alt="" />
            </div>

            <span style={{color: "var(--gray)", fontSize:'12px'}}>{likes} Lượt thích</span>
            <div className="detail">
                <span>
                    <b>{ user._id === data.userId ? user.firstname + " " + user.lastname : data.userId}</b>
                </span>
                <span> {data.desc}</span>
            </div>
        </div>
    );
}

export default Post;