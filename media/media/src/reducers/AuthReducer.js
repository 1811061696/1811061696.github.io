const authReducer = (
    state = { authData: null, loading: false, error: false},
    action
) =>{


    switch(action.type)
    {
        // đăng ký đăng nhập
        case "AUTH_START":
            return {...state, loading: true, error: false}

        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}))
            return {...state, authData: action.data, loading: false, error: false}

        case "AUTH_FAIL":
            return {...state, loading: false, error: true}



        // uploat thông tin cá nhân
        case "UPDATING_START":
            return {...state, updateLoading: true , error: false}

        case "UPDATING_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {...state, authData: action.data, updateLoading: false, error: false}
    
        case "UPDATING_FAIL":
            return {...state, updateLoading: false, error: true}


        // theo dõi và bỏ theo dõi

        case "FOLLOW_USER":
           return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
    
         case "UNFOLLOW_USER":
            return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}


        // đăng xuất
        case "LOG_OUT":
            localStorage.clear();
            return {...state,  authData: null, loading: false, error: false /*updateLoading: false */ }

        default:
            return state
            
    }
}

export default authReducer