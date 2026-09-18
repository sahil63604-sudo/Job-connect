import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function JobDetails() {
    let { jobId } = useParams()
    const [job, setJob] = useState(null)
    let token = localStorage.getItem('token')
    useEffect(() => {
        const getJobDetails = async () => {
            let response = await axios.get(`http://localhost:5000/api/job/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setJob(response.data.job)
            console.log(response.data.job);

        }
        getJobDetails()
    }, [jobId])
    const submitApplication = async () => {
        let response = await axios.post(`http://localhost:5000/api/apply/application/${jobId}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data);
        
    }
    if (!job) {
        return (
            <div>loding.....</div>
        )
    }
    return (
        <>
            <div>Job Detail
            </div>


            <h1>{job.title}</h1>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <p>{job.jobType}</p>
            <p>{job.description}</p>
            {job.skills.map((skill) => (
                <span key={skill}>
                    {skill}
                </span>
            ))}
          
            <button onClick={submitApplication}>Apply Now</button>
           
        </>

    )
}
