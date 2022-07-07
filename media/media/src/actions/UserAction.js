import * as UserApi from "../api/UserRequests";


// cập nhập thông tin người dùng
export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Hành độn không được nhận : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}

// theo doi
export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}


// bo theo doi
export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
}