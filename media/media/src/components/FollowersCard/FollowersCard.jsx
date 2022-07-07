import { useEffect, useState } from "react";
import './FollowersCard.css';

import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";

function FollowersCard() {

    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        const fetchPersons = async() => {
            const { data } = await getAllUser()
            setPersons(data)
        }

        fetchPersons()
    },[])

    return ( <div className="followersCard">
        <h3>Những người bạn có thể biết</h3>

        {persons.map((person, id) => {
            if(person._id !== user._id){
              return (
                    <User person={ person } key={ id } />
                )
            }
        } )}
    </div> );
}

export default FollowersCard;