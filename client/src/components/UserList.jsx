import axios from 'axios'
import React, { useState, useEffect } from 'react'
import UserCard from './UserCard';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isUserChanged, setIsUserChanged] = useState(false)
    useEffect(()=> {
        const fetchData = async()=>{
            const res = await axios.get("/api/admin/users")
            if(res?.status === 200){
                setUsers(res?.data)
            }
        }
        fetchData();
    }, [isUserChanged])
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"}}>
      {users.map((userDetails, id) => (
        <UserCard userDetails={userDetails} isUserChanged={isUserChanged} setIsUserChanged={setIsUserChanged} key={id} />
      ))}
    </div>
    )
}

export default UserList