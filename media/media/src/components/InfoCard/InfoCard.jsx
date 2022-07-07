import React, { useEffect, useState } from "react";
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModel from "../ProfileModel/ProfileModel";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as UserApi from '../../api/UserRequests.js'
import { logOut } from "../../actions/AuthActions";

const InfoCard = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);
  
  
    const handleLogOut = ()=> {
      dispatch(logOut())
    }
  
  
    useEffect(() => {
      const fetchProfileUser = async () => {
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          console.log("fetching")
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser);
          console.log(profileUser)
        }
      };
      fetchProfileUser();
    }, [user]);
  
    return (
      <div className="infoCard">
        <div className="infoHeader">
          <h4>Thông tin của tôi</h4>
          {user._id === profileUserId ? (
            <div>
              <UilPen
                width="2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
              <ProfileModel
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data = {user}
              />
            </div>
          ) : (
            ""
          )}
        </div>
  
        <div className="info">
          <span>
            <b>Trạng thái hôn nhân: </b>
          </span>
          <span>{profileUser.relationship}</span>
        </div>

        <div className="info">
          <span>
            <b>Địa chỉ: </b>
          </span>
          <span>{profileUser.livesIn}</span>
        </div>

        <div className="info">
          <span>
            <b>Công việc: </b>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>
        
        <div className="info">
          <span>
            <b>Địa chỉ làm việc: </b>
          </span>
          <span>Hà Nội </span>
        </div>
  
        <button className="button logout-btn" onClick={handleLogOut}>Đăng xuất</button>
      </div>
    );
  };

export default InfoCard;