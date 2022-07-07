import { useState } from "react";
import './RightSide.css';

import { UilSetting } from '@iconscout/react-unicons';
import Comment from '../../img/comment.png';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import ShareModule from "../ShareModule/ShareModule";
import TrendCard from "../TrendCard/TrendCard";
import { Link } from "react-router-dom";


function RightSide() {
    const [modalOpened, setModalOpened ] = useState(false)
    return ( 
        <div className="rightSide">
            <div className="navIcon">
                <Link to="../home">
                    <img src={Home} alt="" />
                </Link>

                <UilSetting />
                <img src={Noti} alt="" />

                <Link to= '../chat'>
                    <img src={Comment} alt="" />
                </Link>
            </div>

            <TrendCard />

            <button className="button r-button" onClick={() => setModalOpened(true)}>
                Chia sẻ
            </button>
            <ShareModule modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        </div> 
    );
}

export default RightSide;