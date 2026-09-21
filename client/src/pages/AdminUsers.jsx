import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function AdminUsers() {
const [users,setUsers]=useState(null);

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
async function deleteUser(id) {
    try {
        let token=localStorage.getItem('token')
        
        let response= await axios.delete(`http://localhost:5000/api/admin/users/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setUsers(users=>users.filter((user)=>user._id!==id))
    } catch (error) {
        console.log(error);
        
    }
}
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
        <button className='cursor-pointer' onClick={()=>deleteUser(user._id)}>Delete user</button>
        </div>
        
    ))}</div>
  )
}
