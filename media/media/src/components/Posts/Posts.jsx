import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostsAction';
import Post from "../Post/Post";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = () => {
 
  const params = useParams()

  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  let {posts, loading} = useSelector((state) => state.postReducer)
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  },[])
 

  if(!posts) return 'Chưa có bài viết nào';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)

  return (
    <div className="Posts">
      {loading
        ? "Đang hiển thị bài đăng"
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
