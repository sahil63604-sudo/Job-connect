import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function AdminJobs() {

    const [jobs, setJobs] = useState(null)

    useEffect(() => {
        async function getAllJobs() {
            try {
                const token = localStorage.getItem('token')

                const response = await axios.get(
                    'http://localhost:5000/api/admin/jobs',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setJobs(response.data.jobs)

            } catch (error) {
                console.log(error)
            }
        }

        getAllJobs()
    }, [])

    async function deleteJob(jobId) {
        try {
            const token = localStorage.getItem('token')

            await axios.delete(
                `http://localhost:5000/api/admin/jobs/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setJobs((jobs) =>
                jobs.filter((job) => job._id !== jobId)
            )

        } catch (error) {
            console.log(error)
        }
    }

    if (!jobs) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>All Jobs</h1>

            {jobs.map((job) => (
                <div key={job._id}>

                    <h2>{job.title}</h2>

                    <p>Company: {job.company}</p>

                    <p>Location: {job.location}</p>

                    <p>Job Type: {job.jobType}</p>

                    <p>Salary: {job.salary}</p>

                    <p>
                        Recruiter: {job.createdBy?.name}
                    </p>

                    <p>
                        Recruiter Email: {job.createdBy?.email}
                    </p>

                    <button onClick={() => deleteJob(job._id)}>
                        Delete Job
                    </button>

                </div>
            ))}
        </div>
    )
}