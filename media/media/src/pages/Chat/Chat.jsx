import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './Chat.css'


import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Coversation/Conversation";
import Comment from '../../img/comment.png';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import { UilSetting } from '@iconscout/react-unicons';
import ChatBox from "../../components/ChatBox/ChatBox";


import {io} from 'socket.io-client'







function Chat() {

    const { user } = useSelector((state) => state.authReducer.authData)

    const [chats, setchats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef()
    

    // kết nối với socket.io
    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }, [user]);


    // gửi tin nhắn đến máy chủ socket
    useEffect(() => {
        if(sendMessage !== null){
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage])



    // nhận thông báo từ máy chủ socket
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          setReceivedMessage(data);
        });
      }, []);



    // nhận trò chuyện
    useEffect(() => {
        const getChats = async() => {
            try {
                const { data } = await userChats(user._id)
                setchats(data)
            } catch (error) {
                console.log(error)
            }
        }

        getChats()
    }, [user._id])


    // kiểm tra người dùng có đang online hay không
    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };

    return ( 
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">

                <LogoSearch />

                <div className="Chat-container">
                    <h2>Chats</h2>

                    <div className="Chat-list">
                       {chats.map((chat, id) => (
                            <div key={id} onClick={() => setCurrentChat(chat)}>
                                <Conversation data ={chat} currentUserId = {user._id} online={checkOnlineStatus(chat)}/>
                            </div>
                       ))}
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="Right-side-chat">
                <div style={{width: '20rem', alignSelf: 'flex-end'}}>
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
                </div>


                {/* Chat body  */}
                <ChatBox 
                    chat={currentChat}
                    currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage} 
                />

            </div>
        </div>
    );
}

export default Chat;