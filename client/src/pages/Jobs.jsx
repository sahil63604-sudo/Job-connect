import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Jobs() {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const getJobs = async () => {

            const token = localStorage.getItem("token")

            const jobs = await axios.get(
                'http://localhost:5000/api/job/getJob_Search',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setJobs(jobs.data.jobs)
        }

        getJobs()

    }, [])

    return (
        <div>
            <h1>Jobs</h1>

            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <Link to={`/jobs/${job._id}`}>
                    <button >
                        View Details
                    </button>
                    </Link>
                </div>
            ))}
        </div>
    )
}