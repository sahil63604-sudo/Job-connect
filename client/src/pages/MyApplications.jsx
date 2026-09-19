import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MyApplications() {
    const [applications,setApplications]=useState([]);
    let token = localStorage.getItem('token');
    useEffect(()=>{
        async function getApplications() {
            let response=await axios.get('http://localhost:5000/api/apply/getApplication',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            setApplications(response.data.filteredApplications)
            console.log(applications);
            
        }
        getApplications();
    },[])
    if (!applications) {
        return(<>
        <div>loading...</div></>)
    }
  return (
   <div>
            <h1>My Applications</h1>

            {applications.map((application) => (
                <div key={application._id}>
                    <h2>{application.job.title}</h2>
                    <p>{application.job.company}</p>
                    <p>{application.job.location}</p>
                    <p>Status: {application.status}</p>
                </div>))}
                </div>
  )
}
