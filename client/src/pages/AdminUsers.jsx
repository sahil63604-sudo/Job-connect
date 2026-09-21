import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function AdminUsers() {
const [users,setUsers]=useState(null);
let a= new Date();

useEffect(()=>{
    async function getAllUsers() {
        let token= localStorage.getItem('token')
        let response= await axios.get('http://localhost:5000/api/admin/users',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setUsers(response.data.users)
    }
    getAllUsers();
},[]);
if (!users) {
    return(<>
    <div>loading....</div></>)
}
  return (
    <div>{users.map((user)=>(
      
        <div key={user._id}>

        <div>{user.name}</div>
        <div>{user.email}</div>
        <div>{user.roles}</div>
        <div>{user.createdAt}</div>

        </div>
        
    ))}</div>
  )
}
