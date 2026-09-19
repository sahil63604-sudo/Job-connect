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

    return (
        <div>
            <h1>My Jobs</h1>

            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.location}</p>

<Link to={`/recruiterJobs/${job._id}/applicants`}>
                    <button>
                        Applicants
                    </button>
</Link>
                </div>
            ))}
        </div>
    )
}

export default RecruiterDashboard