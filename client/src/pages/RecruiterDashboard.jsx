import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RecruiterDashboard = () => {

    const [jobs, setJobs] = useState([])

    useEffect(() => {

        const getMyJobs = async () => {

            const token = localStorage.getItem("token")

            const response = await axios.get(
                "http://localhost:5000/api/job/getJOBs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response.data)

            setJobs(response.data.myJobs)
        }

        getMyJobs()

    }, [])
    async function deleteJob(Id) {
        let token=localStorage.getItem('token')
        let response = await axios.delete(`http://localhost:5000/api/job/deleteJob/${Id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data.message);
        setJobs((jobs)=>jobs.filter(job=>job._id!==Id))
        
    }

    return (
        <div>
            <h1>My Jobs</h1>
            <Link to={`/recruiterDashboard/create-job`}>
               📝 Create Job
            </Link>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.location}</p>

                    <Link to={`/recruiterDashboard/applicants/${job._id}`}>
                       👨‍💼 Applicants
                    </Link>

                    <Link to={`/recruiterDashboard/edit-job/${job._id}`}>
                       ✒️ Edit
                    </Link>
                    <button onClick={()=>deleteJob(job._id)}>Delete Job</button>
                </div>
            ))}
        </div>
    )
}

export default RecruiterDashboard