import React, {useRef, useState} from "react";
import './PostShare.css';
import ShareImage from '../../img/share.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import  {useDispatch, useSelector} from 'react-redux'
import { uploadImage, uploadPost} from "../../actions/UploadAction";


function PostShare() {
    const loading = useSelector((state) => state.postReducer.uploading)
    const[image, setImage] = useState(null)
    const imageRef =useRef()
    const dispatch = useDispatch()
    const desc = useRef()
    const {user} = useSelector((state) => state.authReducer.authData)

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setImage(img)
        }
    }


    const reset = () => {
        setImage(null)
        desc.current.value=""
    } 


    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename

            console.log(newPost)


            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error)
            }
        }

        dispatch(uploadPost(newPost))
        reset()
    }
    return ( 
        <div className="postShare">
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png" } alt="Huệ óc chó" />

            <div>
                <input 
                    ref={desc}
                    required
                    type="text" 
                    placeholder="Bạn đang nghĩ gì?" 
                />
                <div className="postOptions">
                    <div className="option"
                    style={{color:'var(--photo)'}}
                    onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Ảnh
                    </div>
                    <div className="option"
                    style={{color:'var(--video)'}}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option"
                    style={{color:'var(--location)'}}
                    >
                        <UilLocationPoint />
                        Vị trí
                    </div>
                    <div className="option"
                    style={{color:'var(--shedule)'}}
                    >
                        <UilSchedule />
                        Lịch trình
                    </div>
                    <button 
                        className="button ps-button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Đang đăng" : "Đăng"}
                    </button>
                    <div style={{display: "none"}}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange}/>
                    </div>
                </div>

                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)}/>
                        <img src={URL.createObjectURL(image)} alt="Ảnh" />
                    </div>
                )}

            </div>
        </div> 
    );
}

export default PostShare;