import { useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import './ChatBox.css';

import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';


function ChatBox({ chat, currentUser, setSendMessage, receivedMessage}) {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()


    // Nhận thông báo từ các component
    useEffect(()=> {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
          setMessages([...messages, receivedMessage]);
        }
      
      },[receivedMessage])
    


    // tìm và gán nội dung cho header đoạn chát
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
              const { data } = await getUser(userId);
              setUserData(data);
            } catch (error) {
              console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser])


    // tìm và hiển thị nội dung đoạn chát
    useEffect(() => {
        const fetchMessages = async () => {
            try {
              const { data } = await getMessages(chat._id);
              setMessages(data);
            } catch (error) {
              console.log(error);
            }
          };

        if (chat !== null) fetchMessages();
    }, [chat])


    const hangleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        const message ={
            senderId : currentUser,
            text: newMessage,
            chatId: chat._id,
        }


        //Gửi tin nhắn đến cơ sở dữ liệu
        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }


        // Gửi tin nhắn đến máy chủ 
        const receiverId = chat.members.find((id)=>id!==currentUser);
        setSendMessage({...message, receiverId}) 
    }


    // cuộn đến tin nhắn cuối cùng
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    return ( 
        <>
            <div className="ChatBox-container">

                {chat ?
                 (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img 
                                        src={userData?.profilePicture ? 
                                            process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :
                                            process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} 
                                        alt="" 
                                        
                                        className='followerImg' 
                                        style={{ width: "50px", height: "50px" }}
                                    />

                                    <div className="followerName" style={{fontSize: "0.8rem"}}>
                                        <span style={{marginBottom: '0', fontSize: '16px'}}>
                                            {userData?.firstname} {userData?.lastname}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
                        </div>


                        {/* chat box message */}

                        <div  className="chat-body">
                            {messages.map((message, id) => (
                                    <div 
                                        ref={scroll}
                                        key={id}
                                        className={message.senderId === currentUser
                                        ? "message own"
                                        : "message"}
                                    >
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                            ))}
                        </div>


                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji 
                                value = {newMessage}
                                onChange ={hangleChange}
                            />
                            <div 
                                className="send-button button"
                                onClick={handleSend}
                            >
                                Gửi
                            </div>
                        </div>  
                    </>
                ):
                (
                    <span 
                        className="chatbox-empty-message"
                    >
                        Hãy bắt đầu một cuộc trò chuyện.....
                    </span>
                )}

                
            </div>
        </>
    );
}

export default ChatBox;