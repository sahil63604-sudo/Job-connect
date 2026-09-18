import { useState } from "react"
import axios from 'axios'
export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
 async function handelSubmit(e) {
    e.preventDefault()
    try {
      let response= await axios.post('http://localhost:5000/api/auth/login',{
        email,
        password
      })
      localStorage.setItem("token", response.data.token)
        console.log(response.data)
    } catch (error) {
      console.log(error.response?.data)
    }
    console.log(email,password);
    
  }
  return (
    <div className=" flex justify-center items-center mt-20">
      <form onSubmit={handelSubmit} className="shadow-md rounded-xl p-8 space-y-5">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <div>

        <label className="text-lg ">Email</label>
        <input
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
         className="w-full py-2 border rounded-xl mt-1 px-2 " type="text" placeholder="Enter your email"/>
        </div>
      <div>

        <label className="text-lg">Password</label>
        <input
         value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        className="w-full py-2 border rounded-xl mt-1 px-2" type="text" placeholder="Enter your password"
/>
        </div>
        <div className="flex justify-center">
          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl">Submit</button>
        </div>
      </form>
    </div>
  )
}
